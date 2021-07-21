fetch('http://localhost:3000/dependency-graph/data')
  .then(function (stream) {
    return stream.json();
  })
  .then(function (data) {
    // Set the dimensions and margins of the diagram
    const margin = { top: 20, right: 90, bottom: 30, left: 0 };
    const width = window.innerWidth - margin.left - margin.right;
    const height = window.innerHeight - margin.top - margin.bottom;

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = d3
      .select('body')
      .append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const duration = 750;

    // declares a tree layout and assigns the size
    const treemap = d3.tree().size([height, width]);

    // Assigns parent, children, height, depth
    const root = d3.hierarchy(data, function (d) {
      return d.children;
    });
    root.x0 = height / 2;
    root.y0 = 0;

    if (root.children) {
      root.children.forEach(collapse);
    }
    // Collapse after the second level

    let i = 0;

    update(root);

    // Collapse the node and all it's children
    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }

    function update(source) {
      // Assigns the x and y position for the nodes
      const treeData = treemap(root);

      // Compute the new tree layout.
      const nodes = treeData.descendants();
      const links = treeData.descendants().slice(1);

      // Normalize for fixed-depth.
      nodes.forEach(function (d) {
        if (d.depth === 0) {
          d.y = 100;
        } else {
          d.y = d.depth * 240;
        }
      });

      // ****************** Nodes section ***************************

      // Update the nodes...
      const node = svg.selectAll('g.node').data(nodes, function (d) {
        return d.id || (d.id = ++i);
      });

      // Enter any new modes at the parent's previous position.
      const nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', function (d) {
          return `translate(${source.y0},${source.x0})`;
        })
        .on('click', click);

      // Add Circle for the nodes
      // nodeEnter
      //   .append('circle')
      //   .attr('class', 'node')
      //   .attr('r', 1e-6)
      //   .style('fill', function(d) {
      //     let color = resolveColor(d.data.type);
      //     return d._children ? color : '#fff';
      //   });

      nodeEnter
        .append('text')
        .attr('dx', '-12px')
        .attr('dy', '9px')
        .style('cursor', 'pointer')
        .style('font-size', '24px')
        .attr('text-anchor', function (d) {
          return d.children || 'start';
        })
        .text(function (d) {
          return '⚙️';
        });

      // Add labels for the nodes
      nodeEnter
        .append('text')
        .attr('dy', '.35em')
        .attr('x', function (d) {
          return d.children || 13;
        })
        .attr('text-anchor', function (d) {
          return d.children || 'start';
        })
        .text(function (d) {
          return d.data.name + (d._children ? ' ►' : '');
        });

      // UPDATE
      const nodeUpdate = nodeEnter.merge(node);

      // Transition to the proper position for the node
      nodeUpdate
        .transition()
        .duration(duration)
        .attr('transform', function (d) {
          return `translate(${d.y},${d.x})`;
        });

      // Update the node attributes and style
      nodeUpdate
        .select('circle.node')
        .attr('r', 10)
        .style('fill', function (d) {
          let color = resolveColor(d.data.type);
          return d._children ? color : '#fff';
        })
        .attr('cursor', 'pointer');

      // Remove any exiting nodes
      const nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr('transform', function (d) {
          return `translate(${source.y},${source.x})`;
        })
        .remove();

      // On exit reduce the node circles size to 0
      nodeExit.select('circle').attr('r', 1e-6);

      // On exit reduce the opacity of text labels
      nodeExit.select('text').style('fill-opacity', 1e-6);

      // ****************** links section ***************************

      // Update the links...
      const link = svg.selectAll('path.link').data(links, function (d) {
        return d.id;
      });

      // Enter any new links at the parent's previous position.
      const linkEnter = link
        .enter()
        .insert('path', 'g')
        .attr('class', 'link')
        .attr('d', function (d) {
          const o = { x: source.x0, y: source.y0 };
          return diagonal(o, o);
        });

      // UPDATE
      const linkUpdate = linkEnter.merge(link);

      // Transition back to the parent element position
      linkUpdate
        .transition()
        .duration(duration)
        .attr('d', function (d) {
          return diagonal(d, d.parent);
        });

      // Remove any exiting links
      const linkExit = link
        .exit()
        .transition()
        .duration(duration)
        .attr('d', function (d) {
          const o = { x: source.x, y: source.y };
          return diagonal(o, o);
        })
        .remove();

      // Store the old positions for transition.
      nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      // Creates a curved (diagonal) path from parent to the child nodes
      function diagonal(s, d) {
        return `M ${
          s.y
        } ${s.x} C ${(s.y + d.y) / 2} ${s.x}, ${(s.y + d.y) / 2} ${d.x}, ${d.y} ${d.x}`;
      }

      // Toggle children on click.
      function click(d) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        update(d);
      }
    }
  });
