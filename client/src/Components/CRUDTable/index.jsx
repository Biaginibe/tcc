import React from 'react';
import ReactDOM from 'react-dom';
import CRUDTable,
{
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from 'react-crud-table';

// Component's Base CSS
import './css/styles.css';

const DescriptionRenderer = ({ field }) => <textarea {...field} />;
// const AtivoRenderer = ({field})=> {if(field == 1 ){
// field = <textarea "Psicologo"/>;}
// else field = "paciente"
// };

console.log("teste2");
let tasks = [
  {
    id: 1,
    cpf: 1212121211,
    nome: 'Create an example of how to use the component',
  },
  {
    id: 2,
    cpf: 5543534534,
    nome: 'Improve the component!',
  },
  {
    id: 4,
    cpf: 234234234,
    nome: 'Create an example of how to use the component',
  },
  {
    id: 3,
    cpf: 55554444,
    nome: 'Josué',
    ativo: 1,
    perfil:'psicologo',
    idade: 18,
    email: "aaa@111.com",
    genero: "masc",
  },
];


const SORTERS = {
  NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a)),
};

const getSorter = (data) => {
  const mapper = x => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === 'id') {
    sorter = data.direction === 'ascending' ?
      SORTERS.NUMBER_ASCENDING(mapper) : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter = data.direction === 'ascending' ?
      SORTERS.STRING_ASCENDING(mapper) : SORTERS.STRING_DESCENDING(mapper);
  }

  return sorter;
};


let count = tasks.length;
const service = {
  fetchItems: (payload) => {
    let result = Array.from(tasks);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  },
  create: (task) => {
    count += 1;
    tasks.push({
      ...task,
      
    });
    return Promise.resolve(task);
  },
  update: (data) => {
    const task = tasks.find(t => t.id === data.id);
    task.cpf = data.cpf;
    task.nome = data.nome;
    task.ativo = data.ativo;
    task.perfil = data.perfil;
    task.idade = data.idade;
    task.email = data.email;
    task.genero = data.genero;
    return Promise.resolve(task);
  },
  delete: (data) => {
    const task = tasks.find(t => t.id === data.id);
    tasks = tasks.filter(t => t.id !== task.id);
    return Promise.resolve(task);
  },
};

const styles = {
  container: { margin: 'auto', width: 'fit-content' },
};

const Example = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="Usuários"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field
          name="id"
          label="ID"
          hideInCreateForm
          readOnly
        />
        <Field
          name="cpf"
          label="CPF"
          placeholder="CPF"
        />
        <Field
          name="nome"
          label="Nome"
          render={DescriptionRenderer}
        />
        <Field
          name="ativo"
          label="Ativo"
          type="boolean"
          // render={AtivoRenderer}
          placeholder=""
        />
        
        <Field
          name="perfil"
          label="Perfil"
          placeholder="Perfil"
        />
        <Field
          name="idade"
          label="Idade"
          placeholder="Idade"
        />
        <Field
          name="email"
          label="Email"
          placeholder="Email"

        />
        <Field
          name="genero"
          label="Genêro"
          placeholder="Genêro"
        />
      </Fields>
      <CreateForm
        cpf="Task Creation"
        message="Create a new task!"
        trigger="Create Task"
        onSubmit={task => service.create(task)}
        submitText="Create"
        validate={(values) => {
          const errors = {};
          if (!values.cpf) {
            errors.cpf = 'Please, provide task\'s cpf';
          }

          if (!values.nome) {
            errors.nome = 'Please, provide task\'s nome';
          }

          return errors;
        }}
      />

      <UpdateForm
        cpf="Task Update Process"
        message="Update task"
        trigger="Update"
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={(values) => {
          const errors = {};

          if (!values.id) {
            errors.id = 'Please, provide id';
          }

          if (!values.cpf) {
            errors.cpf = 'Please, provide task\'s cpf';
          }

          if (!values.nome) {
            errors.nome = 'Please, provide task\'s nome';
          }

          return errors;
        }}
      />

      <DeleteForm
        cpf="Task Delete Process"
        message="Are you sure you want to delete the task?"
        trigger="Delete"
        onSubmit={task => service.delete(task)}
        submitText="Delete"
        validate={(values) => {
          const errors = {};
          if (!values.id) {
            errors.id = 'Please, provide id';
          }
          return errors;
        }}
      />
    </CRUDTable>
  </div>
  
);




export default Example;