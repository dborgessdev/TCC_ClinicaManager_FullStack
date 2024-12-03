const formatarCPF = (input) => {
    if (input.length > 3 && input[3] !== '.') {
        input = input.slice(0, 3) + '.' + input.slice(3);
    }
    if (input.length > 7 && input[7] !== '.') {
        input = input.slice(0, 7) + '.' + input.slice(7);
    }
    if (input.length > 11 && input[11] !== '-') {
        input = input.slice(0, 11) + '-' + input.slice(11);
    }
    return input.slice(0, 14);
};

const formatarTelefone = (input) => {
    input = input.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (input.length > 2) {
        // Adiciona o DDD entre parênteses
        input = `(${input.slice(0, 2)}) ${input.slice(2)}`;
    }

    // Garante que o '9' seja obrigatório após o DDD
    if (input.length > 4 && input[5] !== '9') {
        input = input.slice(0, 5) + '9' + input.slice(5);
    }

    if (input.length > 10) {
        // Adiciona o hífen no número
        input = `${input.slice(0, 10)}-${input.slice(10)}`;
    }

    return input.slice(0, 15); // Limita o tamanho final
};



const handleCPFChange = (e) => {
    const input = e.target.value.replace(/\D/g, '').slice(0, 11);
    const cpfFormatado = formatarCPF(input);
    return cpfFormatado; // Retorna o CPF formatado
};

const handleTelefoneChange = (e, setTelefone) => {
    // Remove caracteres não numéricos e limita a 15 dígitos
    const input = e.target.value.replace(/\D/g, '').slice(0, 15);

    // Formata o telefone
    const telefoneFormatado = formatarTelefone(input);

    // Atualiza o estado ou manipula o valor do input
    setTelefone(telefoneFormatado);
};


export { handleCPFChange, formatarCPF, formatarTelefone, handleTelefoneChange };
