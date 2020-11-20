
function createSpan(parentId, text, idx) {
    var parent = document.getElementById(parentId);
    var span_obj = document.createElement("span");
    span_obj.setAttribute("id", "line" + idx);
    span_obj.innerHTML = text;
    parent.appendChild(span_obj);
}

// Promise.all to load multiple data
Promise.all(
    [d3.json("triples_sentence.json"), // file[0]
    d3.json("file_topic.json"), // file[1]
    ]).then((files) => { // files[n] contains nth file

        data = files[0]

        // Use variable "links" to store the each relation 
        // Use variable "nodes" to store distinct nodes
        var links = [];
        var nodes = {};
        var counter = 1;
        data[0].forEach(element => {
            link1 = {};
            link2 = {};
            link1["source"] = nodes[element[0][0]] || (nodes[element[0][0]] = {
                "name": element[0][0]
            });
            link1["target"] = nodes[element[0][1]] || (nodes[element[0][1]] = {
                "name": element[0][1]
            });
            link1["value"] = 0
            link2["source"] = nodes[element[0][1]] || (nodes[element[0][1]] = {
                "name": element[0][1]
            });
            link2["target"] = nodes[element[0][2]] || (nodes[element[0][2]] = {
                "name": element[0][2]
            });
            link2["value"] = 1
            nodes[element[0][1]]["text"] = element[1]
            nodes[element[0][1]]["line"] = element[2]
            nodes[element[0][0]]["type"] = "object"
            nodes[element[0][1]]["type"] = "relation"
            nodes[element[0][2]]["type"] = "subject"
            counter++
            // link["relation"] = nodes[element[0][1]] || (nodes[element[0][1]] = {"name" : element[0][1]});   // might need to modify how to store the "relation" and "text" data
            // link["relation"] = element[0][1];
            // link["text"] = element[1];
            links.push(link1);
            links.push(link2);
        });

        // show article
        var x = document.createElement("ARTICLE");
        x.setAttribute("id", "myArticle");
        document.getElementById("container2").appendChild(x);

        var heading = document.createElement("H1");
        var txt1 = document.createTextNode("Case Context");
        heading.appendChild(txt1);
        document.getElementById("myArticle").appendChild(heading);

        i = 0;
        data[1].forEach(lineContext => {
            createSpan("myArticle", lineContext, i);
            i++;
        })


        document.getElementById("filter_btn").onclick = filter_object;

        // Add new data
        var testElement = [
            [
                ["testSrc1111111", "testRlt111111", "testTrt11111"], "testSrctestRlttestTrt", 20
            ],
        ]
        testElement.forEach(element => {
            link1 = {};
            link2 = {};
            link1["source"] = nodes[element[0][0]] || (nodes[element[0][0]] = {
                "name": element[0][0]
            });
            link1["target"] = nodes[element[0][1]] || (nodes[element[0][1]] = {
                "name": element[0][1]
            });
            link1["value"] = 0
            link2["source"] = nodes[element[0][1]] || (nodes[element[0][1]] = {
                "name": element[0][1]
            });
            link2["target"] = nodes[element[0][2]] || (nodes[element[0][2]] = {
                "name": element[0][2]
            });
            link2["value"] = 1
            nodes[element[0][1]]["text"] = element[1]
            nodes[element[0][1]]["line"] = element[2]
            nodes[element[0][0]]["type"] = "object"
            nodes[element[0][1]]["type"] = "relation"
            nodes[element[0][2]]["type"] = "subject"
            counter++
            links.push(link1)
            links.push(link2)
        });

        // Cases Dropdown
        cases = []
        d3.map(files[1]).keys().sort().forEach((d, i) => {
            if (d.endsWith("_LDA.txt")) {
                cases.push(d.substring(0, d.length - 8))
            } else {
                cases.push(d.substring(0, d.length - 4))
            }
        })

        var cases_dropdown = d3.select("#cases_dropdown")

        cases_dropdown
            .selectAll("option")
            .data(cases)
            .enter()
            .append("option")
            .attr("value", function (option) {
                return option;
            })
            .text(function (option) {
                return option;
            })

        // listener
        // TODO
        cases_dropdown.on("change", function () {
            selected_case = d3.event.target.value
            svg.selectAll("*").remove()
            create_case_svg(selected_case)

        })

        // Builder click listener
        var submitNewNode = d3.select("#submitNewNodeBtn");
        submitNewNode.on("click", function () {
            addNewNode()
        });

        // Add new node function
        var newNodeIdx = data[0].length + 1
        // function addNewNode(event) {
        function addNewNode() {
            // event.preventDefault()

            var subVal = document.getElementById("subVal").value
            var relVal = document.getElementById("relVal").value
            var objVal = document.getElementById("objVal").value
            var newNodeList = [
                [
                    [subVal, relVal, objVal], subVal + relVal + objVal, newNodeIdx
                ],
            ]
            data[0].push(newNodeList)

            newNodeList.forEach(element => {
                link1 = {};
                link2 = {};
                link1["source"] = nodes[element[0][0]] || (nodes[element[0][0]] = {
                    "name": element[0][0]
                });
                link1["target"] = nodes[element[0][1]] || (nodes[element[0][1]] = {
                    "name": element[0][1]
                });
                link1["value"] = 0
                link2["source"] = nodes[element[0][1]] || (nodes[element[0][1]] = {
                    "name": element[0][1]
                });
                link2["target"] = nodes[element[0][2]] || (nodes[element[0][2]] = {
                    "name": element[0][2]
                });
                link2["value"] = 1
                nodes[element[0][1]]["text"] = element[1]
                nodes[element[0][1]]["line"] = element[2]
                nodes[element[0][0]]["type"] = "object"
                nodes[element[0][1]]["type"] = "relation"
                nodes[element[0][2]]["type"] = "subject"
                counter++
                links.push(link1)
                links.push(link2)
            });
            // console.log("After submit data[0]: ", data[0])

            return false;
        }


        // Configuration data
        var c1 = document.getElementById("container1")
        var width = c1.offsetWidth,
            height = c1.offsetHeight,
            rScale = d3.scaleLinear().range([5, 35]);
        var svg = d3.select("#container1").append("svg")
            .attr("class", "graph-svg-component")
            .attr("width", width)
            .attr("height", height)
            .style("float", "left");
        var g = svg.append("g")
        svg.call(d3.zoom().on("zoom", function () {
            g.attr("transform", d3.event.transform)
        })).on("dblclick.zoom", null);

        // ###################################################################################################
        function draw_from_node_path(nodes, links) {
            var force = d3.forceSimulation()
                .nodes(d3.values(nodes))
                .force("link", d3.forceLink(links).distance(50))
                .force('center', d3.forceCenter(width / 2, height / 2))
                .force("x", d3.forceX())
                .force("y", d3.forceY())
                .force("charge", d3.forceManyBody().strength(-300))
                .alphaTarget(1)
                .on("tick", () => { tick(path, node) });

            var path = g.append("g")
                .selectAll("path")
                .data(links)
                .enter()
                .append("path")
                .attr("class", function (d) {
                    return "link" + d.value;
                })
                .attr("marker-end", "url(#end)");

            var node = g.selectAll(".node")
                .data(force.nodes())
                .enter().append("g")
                .attr("class", "node")
                .on("dblclick", dblclick)
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended))

            // add the nodes
            node.append("circle")
                .attr("r", function (d, i) {
                    return 10;
                })
                .attr("class", function (d) { // Assign color for "object", "relation", "subject"
                    var level;
                    if (d["type"] == "object") {
                        level = 1;
                    } else if (d["type"] == "subject") {
                        level = 2;
                    } else {
                        level = 3;
                    }
                    return "level" + level;
                });

            // add label
            node.append("text")
                .attr("dx", 12)
                .attr("dy", -10)
                .text(function (d) {
                    return d["name"]
                })

            function dblclick(d) {
                if (d["type"] == "relation") {
                    document.getElementById("line" + d["line"]).setAttribute("style", "background-color: ");
                }
                d3.select(this).select("circle")
                    .classed("fixed", false)
                d.fixed = false;
                d.fx = null;
                d.fy = null;
            }
            function dragstarted(d) {
                if (!d3.event.active) force.alphaTarget(0.3).restart();
                if (d["type"] == "relation") {
                    document.getElementById("line" + d["line"]).setAttribute("style", "background-color: #FFFF00");
                }
                d3.select(this).select("circle")
                    .classed("fixed", true);
                //classed("fixed", true)

                d.fixed = true;
                d.fx = d.x;
                d.fy = d.y;
            };

            function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            };

            function dragended(d) {
                if (!d3.event.active) force.alphaTarget(0);
                if (d.fixed == true) {
                    d.fx = d.x;
                    d.fy = d.y;
                }
                else {
                    d.fx = null;
                    d.fy = null;
                }
            };

            return_val = [force, node, path];
            return return_val;
        }
        // ###################################################################################################

        var return_val = null;
        return_val = draw_from_node_path(nodes, links)
        var force = return_val[0];
        var node = return_val[1];
        var path = return_val[2];

        // Designed the arrow 
        g.append("defs").append("marker")    // This section adds in the arrows
            .attr("id", "end")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 20)
            .attr("refY", -1.5)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("class", "arrow")
            .attr("d", "M0,-5L10,0L0,5");

        // add the straight lines
        function tick(path, node) {
            path.attr("d", function (d) {
                var dx = d.target.x - d.source.x,
                    dy = d.target.y - d.source.y,
                    dr = Math.sqrt(dx * dx + dy * dy);

                line = "M" + d.source.x + "," + d.source.y +
                    "L" + d.target.x + "," + d.target.y;

                return line;
            });

            node.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        };





        var count = 0


        function filter_object() {
            let object_name = document.getElementById('filter_text').value;

            // new_nodes and new_links are the remaining nodes and links after filtering
            new_nodes = {}
            new_links = []
            links.forEach(function (d) {
                if (d["source"]["name"] == "Apple" || d["source"]["name"] == "sued April 15") {
                    new_links.push(d)
                }
            })
            var nodes_keys = Object.keys(nodes);
            nodes_keys.forEach(function (d) {
                if (d == "Apple" || d == "sued April 15" || d == "(Samsung)") {
                    new_nodes[d] = nodes[d]
                }
            })
            console.log(new_links)
            console.log(new_nodes)
            console.log(object_name)
            // console.log(links)

            // 
            g.remove()
            g = svg.append("g")
            g.append("defs").append("marker")    // This section adds in the arrows
                .attr("id", "end")
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 20)
                .attr("refY", -1.5)
                .attr("markerWidth", 6)
                .attr("markerHeight", 6)
                .attr("orient", "auto")
                .append("path")
                .attr("class", "arrow")
                .attr("d", "M0,-5L10,0L0,5");

            draw_from_node_path(new_nodes, new_links)
        }
    }).catch((err) => {
        console.log(err);
    });
