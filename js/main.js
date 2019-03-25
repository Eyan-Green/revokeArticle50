const petitionUrl = "https://petition.parliament.uk/petitions/241584.json"

const getPetitionData = () => {
	fetch(petitionUrl, {
		method: 'GET'
	})
	.then(response => response.json())
	.then(response => {
		if ($("#selector").val() === "expat") {
			loadChartData(response.data.attributes.signatures_by_country)
		} else if ($("#selector").val() === "patriots") {
			loadChartData(response.data.attributes.signatures_by_constituency)
		}
	})
}

const loadChartData = (petitionData) => {
	let signatures = [];
	let countries = [];
	
	petitionData.forEach( (e) => {
		if (e.name !== "United Kingdom") {
			countries.push(e.name)
			signatures.push(e.signature_count)
		}
	})

	const reducer = (accumulator, currentValue) => accumulator + currentValue;
	if ($("#selector").val() === "expat") {
		$('.title').html(`Revoke Article 50 British Expats By Country. Total Signatures: ${signatures.reduce(reducer)}`)
	} else if ($("#selector").val() === "patriots") {
		$('.title').html(`Revoke Article 50 UK Based Citizens. Total Signatures: ${signatures.reduce(reducer)}`)
	}
	let data = [{
	  values: signatures,
	  labels: countries,
	  textposition: 'inside',
	  type: 'pie'
	}];

	let layout = {
	  height: 1150,
	  width: 1800,
	  legend: {
	  	sort: false
	  }
	};
		
	Plotly.newPlot('chart', data, layout);
}

getPetitionData();

$("#selector").change(() => {
	getPetitionData();
}) 