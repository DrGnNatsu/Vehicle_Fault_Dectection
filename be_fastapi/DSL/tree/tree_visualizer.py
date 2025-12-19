import pydot
from antlr4.tree.Trees import Trees


def add_nodes_edges(dot, tree, parser, parent=None):
    """
    Recursive function to add nodes and edges from ANTLR parse tree.
    """
    node_label = str(tree)
    node_id = str(id(tree))

    # Create a node
    dot_node = pydot.Node(node_id, label=node_label)
    dot.add_node(dot_node)

    if parent:
        dot.add_edge(pydot.Edge(str(id(parent)), node_id))

    # Recurse for children
    if hasattr(tree, "getChildCount"):
        for i in range(tree.getChildCount()):
            add_nodes_edges(dot, tree.getChild(i), parser, parent=tree)


def render_tree(tree, parser, filename="parse_tree.png"):
    dot = pydot.Dot(graph_type="digraph")
    add_nodes_edges(dot, tree, parser)
    dot.write_png(filename)
    print(f"Parse tree saved to {filename}")
