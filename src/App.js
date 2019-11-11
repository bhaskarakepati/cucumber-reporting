import React, { Component } from 'react';

class App extends Component {

state = {
    scenarios: null,
    selectedFile: null
}
millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 1000000000);
  var seconds = ((millis % 1000000000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds.substring(0,2);
}

onChangeHandler=event=>{
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
    console.log(event.target.files[0])
    console.log(this.state.selectedFile)
}
onClickHandler = () => {
console.log(this.state.selectedFile);
let reader = new FileReader();
reader.onload = e => {
      this.setState({
        scenarios: JSON.parse(reader.result)
      })
      console.log(this.state.scenarios);
    };
   reader.readAsText(this.state.selectedFile)
}

  render() {
    return (

<div className="container">
	<div className="row">
	  <div className="col-md-6">
	      <form method="post" action="#" id="#">
              <div className="form-group files">
                <label><b>Upload Cucumber generated Report Json File </b></label>
                <input type="file" className="form-control" name="file" onChange={this.onChangeHandler}/>
                <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>

              </div>
          </form>
	  </div>
	</div>
	{this.state.scenarios !=null &&
            <div className="col-xs-12">
            <h1>Cucumber Report</h1>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Senario</th>
                  <th scope="col">Steps</th>
                  <th scope="col">Total Steps</th>
                </tr>
              </thead>
              <tbody>
              {this.state.scenarios.map((data,index) =>(
                <tr>
                    <th scope="row">{index+1}</th>
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
            }
            </div>
        );
  }
}

export default App;
