import networkx as nx

def json_to_graph(data, graph=None, parent=None):
    if graph is None:
        graph = nx.DiGraph()

    if isinstance(data, dict):
        for key, value in data.items():
            graph.add_node(key)
            if parent:
                graph.add_edge(parent, key)
            json_to_graph(value, graph, parent=key)

    elif isinstance(data, list):
        for index, item in enumerate(data):
            list_key = f"{parent}[{index}]"
            graph.add_node(list_key)
            if parent:
                graph.add_edge(parent, list_key)
            json_to_graph(item, graph, parent=list_key)

    else:
        graph.add_node(data)
        if parent:
            graph.add_edge(parent, data)

    return graph
