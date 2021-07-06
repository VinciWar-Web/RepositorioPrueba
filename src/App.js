import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'

const App = () => {

    const [data, setData] = useState([])


    useEffect(()=>{
        dataApi()
    },[])



    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = (data, e) => {
        e.preventDefault()

        fetch('http://localhost:5000/DatosDB', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        })
        console.log(data)
        
        e.target.reset()
    }





    const dataApi = async () => {
        try {
            
            const url = 'http://localhost:5000/DatosDB'
            const rest = await fetch( url )
            const data = await rest.json()

            const mapData = data.map( item => {
                return{
                    nombre: item.nombre,
                    apellido: item.apellido,
                    sexo: item.sexo,
                    id: item.id
                }
            })

            setData(mapData)

        } catch (error) {
            console.warn('Error al Consumir API')
        }
    }


    const handleBorarDatos = (id) => {
        const deleteData = data.filter( item => item.id !== id)
        setData(deleteData)
   }

    
    

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input 
                    autoComplete="off"
                    placeholder="Nombre" 
                    {...register("nombre", { 
                        required:{
                            value: true,
                            message: 'Campo Requerido' 
                        },
          
                        maxLength:{
                            value: 10,
                            message: 'Maximo 10 Caracteres'
                        },
          
                        pattern:{
                            value: /^[A-Za-z]+$/i,
                            message: 'Solo texto'
                        }
                    })}             
                />

                <input 
                    autoComplete="off"
                    placeholder="Apellido"
                    {...register("apellido", { 
                        required:{
                            value: true,
                            message: 'Campo Requerido' 
                        },
      
                        maxLength:{
                            value: 10,
                            message: 'Maximo 10 Caracteres'
                        },
      
                        pattern:{
                            value: /^[A-Za-z]+$/i,
                            message: 'Solo texto'
                        }
                    })}   
                />
                <select 
                    {...register("sexo", { 
                        required:{
                        value: 'Selecciona...',
                        message: 'Campo Requerido' 
                        }
                    })}
                >
                    <option value="">Selecciona...</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                </select>

                <input type="submit" />

            </form>




            <p className="">
              {errors.nombre && errors.nombre.message}
            </p>

            <p className="">
              {errors.apellido && errors.apellido.message}
            </p>

            <p className="">
              {errors.sexo && errors.sexo.message}
            </p>



            {
                    data.map( item =>  (
                        <ul key={ item.id }>
                            <li>
                                {`Nombre: ${item.nombre} -`}
                                { `Apellido: ${item.apellido} -` }
                                { `Sexo: ${item.sexo}` }
                                <button
                                    onClick={()=>handleBorarDatos( item.id )}
                                >
                                    Borrar
                                </button>
                            </li>
                        </ul>
                    ))
                }

            
        </>
    )
}

export default App