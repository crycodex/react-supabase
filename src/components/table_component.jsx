/* componente para una tabla */
import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";

export const TableComponent = () => {
      //estados para la tabla
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

   //funcion para obtener los datos de la tabla
   useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        //1. consulta a la tabla
        const { data, error } = await supabase
          .from("Todo")
          .select("*")
          .order("id", { ascending: true });

        console.log("data" + data);

        if (error) {
          console.log("error" + error);
        } else {
          setTodos(data || []);
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
                <th>Title</th>
                <th>Description</th>
                <th>isCompleted</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todos, index) => {
                return (
                  <tr key={index}>
                    <td>{todos.id}</td>
                    <td>{todos.created_at}</td>
                    <td>{todos.title}</td>
                    <td>{todos.description}</td>
                    <td>{todos.is_completed ? "Completado" : "Pendiente"}</td>
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