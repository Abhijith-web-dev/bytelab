let t=null,i=!1;async function l(){if(t)return t;if(!i){i=!0;try{let e=null;try{e=(await import("https://cdn.jsdelivr.net/pyodide/v0.27.2/full/pyodide.mjs")).loadPyodide}catch(o){console.warn("CDN Pyodide load failed, attempting local package fallback:",o),e=(await import("./pyodide-2h8lTsJC.js")).loadPyodide}if(!e)throw new Error("Failed to resolve loadPyodide function from ESM import");t=await e({indexURL:"https://cdn.jsdelivr.net/pyodide/v0.27.2/full/"}),await t.runPythonAsync(`
import sys
import io

class OutputCapture:
    def __init__(self):
        self.stdout_buffer = io.StringIO()
        self.stderr_buffer = io.StringIO()
    
    def start(self):
        self.old_stdout = sys.stdout
        self.old_stderr = sys.stderr
        sys.stdout = self.stdout_buffer
        sys.stderr = self.stderr_buffer
    
    def stop(self):
        sys.stdout = self.old_stdout
        sys.stderr = self.old_stderr
    
    def get_stdout(self):
        return self.stdout_buffer.getvalue()
    
    def get_stderr(self):
        return self.stderr_buffer.getvalue()

_capture = OutputCapture()
`),self.postMessage({type:"ready",version:"0.27.2"})}catch(e){console.error("Pyodide initialization error:",e),self.postMessage({type:"init_error",error:e.message})}finally{i=!1}}}self.onmessage=async e=>{const{type:o,id:n,code:r,stdin:f="",timeoutMs:c=5e3}=e.data;if(o==="init"){await l();return}if(o==="execute"){const u=performance.now();t||await l();try{(r.includes("import numpy")||r.includes("import np")||r.includes("from numpy"))&&await t.loadPackage("numpy"),(r.includes("import pandas")||r.includes("import pd")||r.includes("from pandas"))&&await t.loadPackage("pandas"),await t.runPythonAsync(`
_capture.stdout_buffer = io.StringIO()
_capture.stderr_buffer = io.StringIO()
_capture.start()
`),await t.runPythonAsync(r),await t.runPythonAsync("_capture.stop()");const s=t.runPython("_capture.get_stdout()"),a=t.runPython("_capture.get_stderr()"),d=Math.round(performance.now()-u);self.postMessage({id:n,type:"result",status:a?"runtime_error":"passed",stdout:s?s.trimEnd():"",stderr:a?a.trimEnd():"",executionTimeMs:d})}catch(s){try{await t.runPythonAsync("_capture.stop()")}catch{}const a=Math.round(performance.now()-u),d=s.message.includes("SyntaxError")||s.message.includes("IndentationError");self.postMessage({id:n,type:"result",status:d?"syntax_error":"runtime_error",stdout:"",stderr:s.message,executionTimeMs:a})}}};
