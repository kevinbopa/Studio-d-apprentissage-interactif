import json
import os
import re
from pathlib import Path

SOURCE = "agilite_xp_source.md"
OUT = os.path.join(os.path.dirname(__file__), ".graphify_chunk_01.json")


def slugify(text: str) -> str:
    s = text.strip().lower()
    s = re.sub(r"[^\w\s-]", "", s, flags=re.UNICODE)
    s = re.sub(r"\s+", "-", s)
    return s.strip("-") or "section"


def build_graph(markdown_text: str):
    nodes = []
    edges = []
    stack = []  # (level, node_id)
    order = 0

    root_id = "agilite_xp_source"
    nodes.append(
        {
            "id": root_id,
            "label": "Agilité et XP (source markdown)",
            "file_type": "paper",
            "source_file": SOURCE,
            "source_location": "document",
            "source_url": None,
            "captured_at": None,
            "author": "Université Laval",
            "contributor": None,
        }
    )

    for line_no, line in enumerate(markdown_text.splitlines(), start=1):
        m = re.match(r"^(#{1,6})\s+(.+?)\s*$", line)
        if not m:
            continue

        level = len(m.group(1))
        title = m.group(2).strip()
        node_id = f"{root_id}__{slugify(title)}__{order}"
        order += 1

        nodes.append(
            {
                "id": node_id,
                "label": title,
                "file_type": "paper",
                "source_file": SOURCE,
                "source_location": f"line {line_no}",
                "source_url": None,
                "captured_at": None,
                "author": None,
                "contributor": None,
            }
        )

        while stack and stack[-1][0] >= level:
            stack.pop()

        parent_id = stack[-1][1] if stack else root_id
        edges.append(
            {
                "source": parent_id,
                "target": node_id,
                "type": "contains",
                "weight": 1.0,
                "justification": f"Heading level {level}",
            }
        )
        stack.append((level, node_id))

    return {
        "nodes": nodes,
        "edges": edges,
        "hyperedges": [],
        "metadata": {
            "source_file": SOURCE,
            "generator": "graphify-out/build_graph.py",
            "encoding": "utf-8",
        },
    }


def main():
    project_root = Path(__file__).resolve().parents[1]
    source_path = project_root / SOURCE

    text = source_path.read_text(encoding="utf-8")
    graph = build_graph(text)

    out_path = Path(OUT)
    out_path.write_text(json.dumps(graph, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Graph written to {out_path}")
    print(f"Nodes: {len(graph['nodes'])} | Edges: {len(graph['edges'])}")


if __name__ == "__main__":
    main()
