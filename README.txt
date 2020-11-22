# DESCRIPTION - Describe the package in a few paragraphs

INSTALLATION - How to install and setup your code
# EXECUTION - How to run a demo on your code
## Font-end:
LDA tree page (lda_tree.html): 
This page visualizes categories provided by the LDA model as a tree structure in “data/lda_tree_names.json”. To simplify the information, we create an additional layer to include similar cases into a branch. 

Knowledge graph page (knowledge_graph.html):
This tool extract sentence cropped by the back-end in “data/all_files_triples_sentence.json”. It displays the visualization of the relationships between objects in the law case document. 
* To locate the sentence of a set of nodes: (1) Click center node (relation) node. (2) The sentence will be highlighted in the article.
* To add a new “subject-relation-object” graph: (1) Type in a subject name, relation, and the object name into the input fields at the top-left corner. (2) Click submit to add new nodes into the graph. 
* To add nodes for a sentence in the article: (1) Click the sentence. (2) type in the object, relation, and subject. (3) Click “submit”.
* Filter/search: (1) Type in target name. (2) Click “Filter Object” (3) Type in new target names if needed. (4) To remove the filtering condition, click the filter tag.