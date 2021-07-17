import React, {useEffect, useState}  from 'react';
import axios from 'axios';
import Loading from './Loading';
import Pagination from './Pagination';

function Giphy () {
    const [data,setData]= useState([]);
    const [search,setSearch]= useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [currentPage, setCurrentPage]= useState(1);
    const [itemsPerPage, setItemsPerPage]= useState(10);
    const indexOfLastItem = currentPage*itemsPerPage;
    const indexOfFirstItem = indexOfLastItem-itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem,indexOfLastItem)
    useEffect(()=>{
        const fetchData= async()=>{
            setIsError(false)
            setIsLoading(true)
            try{

                const results = await axios("https://api.giphy.com/v1/gifs/trending",{
                params: {
                    api_key: "gUvzKvyLo1OmPNVSlaqWK0w11MmEoUn1",
                
                }
            });
            console.log(results)
            setData(results.data.data);
            }catch(error){
                setIsError(true)
                console.log(error)

            }
           
            
            setIsLoading(false)

        };
        fetchData()

    },[])
    const renderGifs= ()=>{
        if(isLoading){
            return <div className=""><Loading/></div>
        }
        return currentItems.map(el=>{
            return(
                <div key={el.id} className="gif">
                    <img src= {el.images.fixed_height.url} />
                </div>
            )
        })
    }
    const renderError=()=>{
        if (isError){
            return(
                <div className="alert-danger">unable to get gifs please try after sometime</div>
            )
        }
    
    }
    const handleSearchChange = (e) =>{
        setSearch(e.target.value);
    };
    const handleSubmit=  async(e) =>{
        e.preventDefault();
          setIsError(false);
          setIsLoading(true);
          try{
            const results= await axios("https://api.giphy.com/v1/gifs/search",{
                params:{
                    api_key: "gUvzKvyLo1OmPNVSlaqWK0w11MmEoUn1",
                    limit:10,
                    q: search
                }
            });
            setData(results.data.data);

          } catch(error){
            setIsError(true)
            console.log(error)
          }
        
            
            
            setIsLoading(false);    

    }
    const pageSelect= (pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    return(
        <div className="abc">
            {renderError()}
            <form className="form-inline justify-content-center abc">
                <input value ={search} onChange= {handleSearchChange} type="text" placeholder="search gif" className="form-control" />
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">START</button>
                </form>
                <Pagination pageSelect={pageSelect} currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={data.length}/>

       
        <div className="container gifs">
            {renderGifs()}
        </div>
        </div>
    )

}
export default Giphy;