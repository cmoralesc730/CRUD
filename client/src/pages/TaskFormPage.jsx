import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, deleteTask, getTask, updateTask } from "../api/tasks.api";
import { toast } from "react-hot-toast";

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
      toast.success("Reserva actualizada", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    } else {
      await createTask(data);
      toast.success("Reserva añadida", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }

    navigate("/tasks");
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const { data } = await getTask(params.id);
        setValue("fullname", data.title);
        setValue("description", data.description);
      }
    }
    loadTask();
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit} className="bg-zinc-800 p-10 rounded-lg mt-2">
        <input
          type="text"
          placeholder="Nombre completo"
          {...register("fullname", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          autoFocus
        />

        {errors.fullname && <span>Llenar correctamente</span>}

        <textarea
          placeholder="Notas generales"
          {...register("description", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full"
        />

        {errors.description && <span>Llenar correctamente</span>}

        <label htmlFor="reservation_date">Fecha de la Reserva:</label>
        <input
          type="date"
          id="reservation_date"
          {...register("reservation_date")}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />

        <label htmlFor="reservation_time">Hora de la Reserva:</label>
        <input
          type="time"
          id="reservation_time"
          {...register("reservation_time")}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />

        <label htmlFor="number_of_guests">Número de Invitados:</label>
        <input
          type="number"
          id="number_of_guests"
          {...register("number_of_guests")}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />

        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
          Guardar
        </button>
      </form>

      {params.id && (
        <div className="flex justify-end">
          <button
            className="bg-red-500 p-3 rounded-lg w-48 mt-3"
            onClick={async () => {
              const accepted = window.confirm("¿Está seguro?");
              if (accepted) {
                await deleteTask(params.id);
                toast.success("Reserva removida", {
                  position: "bottom-right",
                  style: {
                    background: "#101010",
                    color: "#fff",
                  },
                });
                navigate("/tasks");
              }
            }}
          >
            delete
          </button>
        </div>
      )}
    </div>
  );
}
