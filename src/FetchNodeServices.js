var axios=require("axios")
var ServerURL="http://localhost:5000"

//to read all data
const getData=async(url)=>{
    try
    {
    const headers = {
        headers:{
            "authorization":`Bearer ${localStorage.getItem("token")}`||null
        }
    }
    var response= await fetch(`${ServerURL}/${url}`, headers)
    var result=await response.json()
    return result;
    }
    catch(e)
    {
        console.log("Error:",e)
        return null
    }
}
// used when queries contain parameters
const postData = async (url, body) => {
    try
    {
        const response = await fetch(`${ServerURL}/${url}`,{
            method:"POST",
            mode:"cors",
            headers:{"Content-Type": "application/json;charset=utf-8",
                     "authorization": `Bearer $(localStorage.getItem("token"))`||null
                    },
            body: JSON.stringify(body),
        })
        const result = await response.json()
        return result
    }
    catch(e)
    {
        return null
    }
}

const postDataAndImage = async (url, formData) => {
    try
    {
        const response = await axios.post(`${ServerURL}/${url}`, formData, {headers:{"content-type": "multipart/formData", "authorization": `Bearer $(localStorage.getItem("token"))`||null}});
        const result = await response.data.result
        return result
    }
    catch(e)
    {
        return null
    }
}

const postDataAndImageWithId = async (url, formData) => {
    try
    {
        const response = await axios.post(`${ServerURL}/${url}`, formData, {headers:{"content-type": "multipart/formData"}});
        const result = await response.data
        return result
    }
    catch(e)
    {
        return null
    }
}

export {getData,postData,postDataAndImage,ServerURL,postDataAndImageWithId}