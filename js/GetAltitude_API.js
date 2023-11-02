//--------------- API map.geo.admin -  GET data with jQuery  ----------------- 

let url;

function updateUrl(newUrl) {
  url = newUrl;
};

function getData(url, queryobj) {
  console.log('Cette page tente de joindre:', url);
  return $.ajax({
	url: url,
	type: 'GET',
	data: queryobj,
  });
};

// https://api3.geo.admin.ch/services/sdiservices.html#height
// https://api3.geo.admin.ch/api/examples.html#other-js-web-mapping-apis-integration
async function getHeight(x, y) {
    /** Recuperer promise altitude du point
     * swissALTI3D (MNT) 
     * 
     *  @param {float} x coord Nord MN95 
     *  @param {float} y coord Est MN95
     *  @returns {string} height h_promise NF02
     * 
     */

	const queryobj = {
        easting : y,
        northing : x,
	};
	const data = await getData(url, queryobj)
    console.log(data.height);
	return data.height
};




