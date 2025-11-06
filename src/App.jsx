/* conectando a supabase */

import { useEffect, useState } from "react";
import { supabase } from "./supabase/client";

function App() {
  const [status, setStatus] = useState("Verificando...");

  useEffect(() => {
    const checkConnection = async () => {
      try{

        const {error} = await supabase.auth.getSession();

        if(error && error.status === 500){
          setStatus("❌ Error de conexión");
        }else{
          setStatus("✅ Conectado");
        }
      }catch{
        setStatus("❌ Error de conexión");
      }
    }
    checkConnection();
  }, []);

  return (
    <div>
      <h1>Conexion a supabase</h1>
      <p>{status}</p>
  
    </div>
  )
}

export default App;