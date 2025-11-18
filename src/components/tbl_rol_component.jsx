/* componente para una tabla */
import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";

export const TableRolComponent = () => {
      //estados para la tabla
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

   //funcion para obtener los datos de la tabla
   useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        //1. consulta a la tabla
        const { data, error } = await supabase
          .from("tbl_roles")
          .select("*")
          .order("id", { ascending: true });

        console.log("data" + data);

        if (error) {
          console.log("error" + error);
        } else {
          setRoles(data || []);
        }
      } catch (e) {
        console.log("error" + e);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div>
         <h1>Tabla Todo</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Created At</th>
                <th>Rol</th>
                <th>Correo</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((roles, index) => {
                return (
                  <tr key={index}>
                    <td>{roles.id}</td>
                    <td>{roles.created_at}</td>
                    <td>{roles.rol}</td>
                    <td>{roles.correo}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}