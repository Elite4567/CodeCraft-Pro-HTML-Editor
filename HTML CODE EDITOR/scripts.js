  let editor;

    window.onload = function() {
      editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
        lineNumbers: true,
        mode: "htmlmixed",
        matchBrackets: true,
        theme: "default",
      });

      clearOutput(); // Clear the output initially
    };

    function runCode() {
      const code = editor.getValue();
      const output = document.getElementById('output').contentWindow.document;
      output.open();
      output.write(code);
      output.close();
    }

    function clearOutput() {
      document.getElementById('output').contentWindow.document.body.innerHTML = '';
    }

    function formatCode() {
      const code = editor.getValue();
      const formattedCode = html_beautify(code, { indent_size: 2, wrap_line_length: 80 });
      editor.setValue(formattedCode);
      editor.save();
    }

    function saveFile() {
      const code = editor.getValue();
      try {
        localStorage.setItem('savedCode', code);
        alert('File saved successfully!');
      } catch (error) {
        alert('Failed to save file. ' + error);
      }
    }

    function loadFile() {
      try {
        const savedCode = localStorage.getItem('savedCode');
        if (savedCode) {
          editor.setValue(savedCode);
          alert('File loaded successfully!');
        } else {
          alert('No saved file found.');
        }
      } catch (error) {
        alert('Failed to load file. ' + error);
      }
    }