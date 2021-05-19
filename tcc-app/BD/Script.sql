CREATE database tcc;
use tcc;
create table usuario (
	id int(11) primary key auto_increment,
    cpf varchar(14), /*que faz o papel de login*/
    senha varchar(20),
    perfil int(2), /*perfil 1 = adm, perfil 2 = psico, perfil 3 = paciente*/
	nome varchar(100),
    idade int(3),
    email varchar(100),
    genero varchar(20)
);

create table psicologo(
	id int(11) primary key,
    metodologia varchar(30),
    numeroContato int(15),
    tempoConsulta varchar(30),
    valorConsulta varchar(10),
    faixaEtaria varchar(20),
    descricao varchar(300),
    CRP varchar(30)
    /*agenda achei melhor fazer uma tabela a parte pra depois facilitar pra gerar fila*/
);

create table paciente(
	id int(11) primary key,
    endereco varchar(100),
    latitude int(20), 
    longitude int(20)
);
