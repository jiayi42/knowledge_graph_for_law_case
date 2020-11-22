# DESCRIPTION
Knowledge graph for law case project - Georgia Tech CSE 6242
We aim to visualize a law case document to improve the reading experience.

# INSTALLATION - How to install and setup your code

# EXECUTION
## Font-end:
### LDA tree page (lda_tree.html): 
This page visualizes categories provided by the LDA model as a tree structure in “data/lda_tree_names.json”. To simplify the information, we create an additional layer to include similar cases into a branch. 

### Knowledge graph page (knowledge_graph.html):
This tool extract sentence cropped by the back-end in “data/all_files_triples_sentence.json”. It displays the visualization of the relationships between objects in the law case document. 
* To locate the sentence of a set of nodes: (1) Click center node (relation) node. (2) The sentence will be highlighted in the article.
* To add a new “subject-relation-object” graph: (1) Type in a subject name, relation, and the object name into the input fields at the top-left corner. (2) Click submit to add new nodes into the graph. 
* To add nodes for a sentence in the article: (1) Click the sentence. (2) type in the object, relation, and subject. (3) Click “submit”.
* Filter/search: (1) Type in target name. (2) Click “Filter Object” (3) Type in new target names if needed. (4) To remove the filtering condition, click the filter tag.



# NLP (Backend) part:

## Outline
### A. LDA topic clustering in Colab over all files
### B. Relation extraction for KG over all files
### C. future deployment to append a single file into processing json file for LDA and KG. (Optional) as it is not main workflow in our project

## Important: Please change file paths for your google drive or local computers in code segments due to saving and writing files


## A. LDA topic clustering in Colab over all files

### Usage:
(1) upload LDA_all.ipynb in NLP directory to your google drive.
(2) upload all legal documents to the same place in a txt format without other txt files.  (we do not offer the files here due to talent issue)
(3) Run the code segments sequentially (including installation segments)
(4) please rerun some previous segments if you need to restart variable environments after some package installation
(5) Run code segments until the  one with a comment "# saving"
(6) You get file_topic.json, tokenizer.pkl, and tokenizer.pkl. Good jobs. Please download them into your future_upload_deployment directory from our github.
=== in your local computer
(7) Copy file_topic.json and rename the copy one into file_topic_1120.json
(8) Run LDA_KG_One2One.py with into file_topic_1120.json and all_files_triples_sentence.json from (2) part to get file_topic_pruning.json 
(or you can use the one in display/data/expired)
(9) Put file_topic_pruning.json in display and run tree_data.py to obtain file_topic_1120_reverse4.json
(10) Rename file_topic_1120_reverse4.json into lda_tree_names.json

## B. Relation extraction for KG over all files

### Usage:
(1) in your computer, please create a python3.7 environment and install the right version python package in requirement.txt in NLP directory strictly.
   Or, the following packages
   spacy==2.1.0
   networkx==2.5
   matplotlib==3.3.2
   pandas==1.1.3
   neuralcoref==4.0
   --no-binary neuralcoref
(2) install other package you may need if you cannot import python package you need (not strictly for version and please do not change the version for strict ones) 
(3) put all legal documents which are related background part to the same place in a txt format in one directory you wish without other txt files. 
(we do not offer the files here due to talent issue)
(4) put DVA_NLP_law_KG_V3 in NLP directory into the (3) directory you create and then run it about 4-5 hours (This long time is for processing 1000 documents) 
(5) You will obtain all_files_triples_sentence.json for (1), (3), and visualization part

## C. Future deployment to append a single file into processing json file for LDA and KG. (Optional) as it is not main workflow in our project

### Usage:
(1) go to future_upload_deployment directory from our github
(2) make sure you put new_file.txt(a single file to be appended), file_topic.json, tokenizer.pkl, tokenizer.pkl, and all_files_triples_sentence.json
(3) install flask, the environments and package from A. and B.
(4) run deploy and enter the file name (here is new_file.txt)
(5) You obtain all_files_triples_sentence.json and file_topic.json with the information from new_file.txt
(6) Note this experimental part is for flask and our A. B. combination. It is not included in our main workflow.
