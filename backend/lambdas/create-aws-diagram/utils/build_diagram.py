from diagrams import Diagram

from node_types import node_types


def build_diagram(nodes, edges, filename, output_format):
    node_objs = {}

    with Diagram("AWS Architecture", filename=filename, outformat=output_format, show=False):
        node_objs = {}
        for node in nodes:
            cls = node_types.get(node["type"])
            if cls:
                node_objs[node["id"]] = cls(node["label"])
            else:
                raise ValueError(f"Unknown node type: {node['type']}")

        for edge in edges:
            from_node = node_objs[edge["from"]]
            to_node = node_objs[edge["to"]]
            from_node >> to_node
    