import json
import networkx as nx
import matplotlib.pyplot as plt
from io import BytesIO

from generate_graph import json_to_graph

def render_json_to_buffer(input_text, output_format):
    json_data = json.loads(input_text)
    graph = json_to_graph(json_data)
    pos = nx.spring_layout(graph)
    
    plt.figure(figsize=(10, 10))
    nx.draw(graph, pos, with_labels=True, node_color="lightblue", font_size=8, node_size=500)
    
    buffer = BytesIO()
    plt.savefig(buffer, format=output_format)
    buffer.seek(0)
    plt.close()
    
    return buffer
