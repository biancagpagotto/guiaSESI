create database guiasesi;
use guiasesi;

create table usuario(
    id_usuario int auto_increment primary key,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    senha varchar(255) not null,
    tipo ENUM('aluno', 'professor','coordenacao') not null
);

create table aluno (
    id_aluno int auto_increment primary key,
    id_usuario int not null,
    ra varchar(20) not null unique,
    turma varchar(30),
    serie varchar(20),
    foreign key (id_usuario) references usuario(id_usuario)
);

create table professor (
    id_professor int auto_increment primary key,
    id_usuario int not null,
    disciplina varchar(100),
    foreign key (id_usuario) references usuario(id_usuario)
);

create table coordenacao(
    id_coordenacao int auto_increment primary key,
    id_usuario int not null,
    setor varchar(100),
    foreign key (id_usuario) references usuario(id_usuario)
);

create table aviso (
    id_aviso int auto_increment primary key,
    id_usuario int not null,
    titulo varchar(150) not null,
    descricao text not null, 
    data_piblicacao datetime default current_timestamp, 
    foreign key (id_usuario) references usuario (id_usuario)
);

create table aviso (
    id_meterial int auto_increment primary key,
    id_professor int not null,
    titulo varchar(150) not null,
    tipo varchar(50), 
    link varchar(500), 
    foreign key (id_professor) references usuario (id_professor)
);

create table boletim (
    id_boletim int auto_increment primary key,
    id_aluno int not null,
    disciplina varchar(100) not null,
    bimestre int not null, 
    nota decimal(4,2), 
    frequencia decimal(5,2)
    foreign key (id_aluno) references usuario (id_aluno)
);

create table agenda (
    id_agenda int auto_increment primary key,
    id_aluno int not null,
    titulo varchar(100) not null,
    descricao text, 
    data_evento date not null, 
    horario time,
    foreign key (id_aluno) references usuario (id_aluno)
);

create table cardapio (
    id_cardapio int auto_increment primary key,
    data_cardapio date not null,
    descricao text not null
);

create table mensagem (
    id_mensagem int auto_increment primary key,
    id_usuario date not null,
    mensagem text not null,
    data_envio datetime default current_timestamp,
    foreign key (id_usuario) references usuario(id_u)
);





