import {axiosInstance} from './axiosInstance'


export const cadastrarPaciente = async (paciente) => {
    const response = await axiosInstance.post('/api/cadastrar-paciente/', paciente);
    return response.data;
};

export const listarPacintes = async () => {
    const response = await axiosInstance.get('/api/pacients/');
    return response.data;
};

export const listaEnfermeiros = async () => {
    const response = await axiosInstance.get('/api/nurses/');
    return response.data;
};

export const addPacienteFila = async (paciente) => {
    const response = await axiosInstance.post('/api/cadastrar-atendimento/', paciente);
    return response.data;
};

export const getFilaPreTriagem = async () => {
    const response = await axiosInstance.get('/api/pre-triagem/');
    return response.data;
};