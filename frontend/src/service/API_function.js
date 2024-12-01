import {axiosInstance} from './axiosInstance'


export const cadastrarPaciente = async (paciente) => {
    console.log(paciente);
    const response = await axiosInstance.post('/api/cadastrar-paciente/', paciente);
    return response.data;
};