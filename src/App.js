import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import './App.css';

function App() {
  return (
    <div className="App">
      <Form>
        <Form.Field>
          <label>Recipe</label>
          <input placeholder='Recipe URL' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  );
}

export default App;
