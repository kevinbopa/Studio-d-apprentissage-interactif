import json
from collections import Counter
from datetime import datetime
from pathlib import Path


ROOT = Path(__file__).resolve().parent
CHUNK_PATH = ROOT / ".graphify_chunk_01.json"
GRAPH_PATH = ROOT / "graph.json"
REPORT_PATH = ROOT / "GRAPH_REPORT.md"


def build_graph_json(chunk: dict) -> dict:
    nodes = chunk.get("nodes", [])
    edges = chunk.get("edges", [])
    metadata = chunk.get("metadata", {})

    graph_nodes = []
    for node in nodes:
        graph_nodes.append(
            {
                "id": node["id"],
                "label": node.get("label", node["id"]),
                "file_type": node.get("file_type", "paper"),
                "source_file": node.get("source_file"),
                "source_location": node.get("source_location"),
            }
        )

    graph_links = []
    for edge in edges:
        graph_links.append(
            {
                "source": edge["source"],
                "target": edge["target"],
                "type": edge.get("type", "contains"),
                "weight": edge.get("weight", 1.0),
                "justification": edge.get("justification", ""),
            }
        )

    return {
        "directed": True,
        "multigraph": False,
        "metadata": {
            "generated_at": datetime.now().isoformat(timespec="seconds"),
            "source_file": metadata.get("source_file", "agilite_xp_source.md"),
            "generator": "graphify-out/sync_outputs.py",
        },
        "nodes": graph_nodes,
        "links": graph_links,
    }


def build_report(chunk: dict) -> str:
    nodes = chunk.get("nodes", [])
    edges = chunk.get("edges", [])
    metadata = chunk.get("metadata", {})

    source_file = metadata.get("source_file", "agilite_xp_source.md")
    heading_nodes = [n for n in nodes if n["id"] != "agilite_xp_source"]
    top_labels = [n["label"] for n in heading_nodes[:20]]

    parent_count = Counter(e["source"] for e in edges)
    top_hubs = parent_count.most_common(10)

    lines = [
        f"# Graph Report - {source_file}",
        "",
        "## Résumé",
        f"- Nœuds: {len(nodes)}",
        f"- Arêtes: {len(edges)}",
        f"- Hyperarêtes: {len(chunk.get('hyperedges', []))}",
        "",
        "## Titres détectés (aperçu)",
    ]

    if top_labels:
        lines.extend([f"- {label}" for label in top_labels])
    else:
        lines.append("- Aucun titre détecté.")

    lines.extend(
        [
            "",
            "## Nœuds les plus connectés (sortants)",
        ]
    )

    if top_hubs:
        lines.extend([f"- {node_id}: {count}" for node_id, count in top_hubs])
    else:
        lines.append("- Aucun lien détecté.")

    lines.extend(
        [
            "",
            "## Source",
            f"- Fichier: `{source_file}`",
            f"- Mis à jour: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        ]
    )

    return "\n".join(lines) + "\n"


def main():
    chunk = json.loads(CHUNK_PATH.read_text(encoding="utf-8"))
    graph_json = build_graph_json(chunk)
    GRAPH_PATH.write_text(
        json.dumps(graph_json, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    REPORT_PATH.write_text(build_report(chunk), encoding="utf-8")

    print(f"Synced: {GRAPH_PATH}")
    print(f"Synced: {REPORT_PATH}")
    print(f"Nodes: {len(chunk.get('nodes', []))} | Edges: {len(chunk.get('edges', []))}")


if __name__ == "__main__":
    main()
