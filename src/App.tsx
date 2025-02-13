import Input from "./components/Input";
import Form from "./components/Form";
import Button from "./components/Button";

function App() {
  return (
    <main>
      <Form>
        <Input label="Name" id="name" type="text" />
        <Input label="Age" id="age" type="number" />
        <p>
          <Button>Submit</Button>
        </p>
      </Form>
    </main>
  );
}

export default App;
