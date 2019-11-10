import React, { Component } from 'react';
import PostData from './data/cucumber.json';

class App extends Component {

state = {
    scenarios: []
}
componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res => res.json())
    .then((data) => {
       this.setState({
            scenarios: PostData
          })
      console.log(this.state.scenarios)
    })
    .catch(console.log)
}
millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 1000000000);
  var seconds = ((millis % 1000000000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds.substring(0,2);
}

  render() {
    return (
           <div className="container">
            <div className="col-xs-12">
            <h1>Cucumber Report</h1>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Senario</th>
                  <th scope="col">Steps</th>
                  <th scope="col">Total Steps</th>
                </tr>
              </thead>
              <tbody>
              {this.state.scenarios.map((data) =>(
                <tr>
                    <td>{data.name}</td>
                    <td>
                        {data.elements[0].steps.map((step) =>(
                            <tr>
                                <td><font color='blue'>{step.keyword}</font> {step.name}</td>
                                <td>{step.result.status}</td>
                                {step.result.duration!=null &&
                                <td>{this.millisToMinutesAndSeconds(step.result.duration)}</td>
                                }
                                {step.result.duration==null &&
                                <td>0</td>
                                }
                            </tr>
                        ))}
                    </td>
                    <td>VIJJ</td>
                </tr>
              ))
              }
              </tbody>
            </table>

            </div>
           </div>
        );
  }
}

export default App;
