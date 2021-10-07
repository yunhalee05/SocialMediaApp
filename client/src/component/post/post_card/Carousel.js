import React from 'react'

function Carousel({images, id}) {
    const isActive = index=>{
        if(index===0) return "active"
    }
    
    return (
        <div id={`image${id}`} className="carousel slide" data-ride="carousel">
            {
                images.length > 1 &&
                <ol className="carousel-indicators" style={{zIndex: 1}}>
                    {
                        images.map((img, index) => (
                            <li key={index} data-target={`#image${id}`} 
                            data-slide-to={index} className={isActive(index)} />
                        ))
                    }
                    
                </ol>
            }

            <div className="carousel-inner">
                {
                    images.map((img, index) => (
                        <div key={index} className={`carousel-item ${isActive(index)}`}>
                            {
                                img.data.match(/video/i)||img.data.match(/mp4/i)||img.data.match(/avi/i)||img.data.match(/mov/i)||img.data.match(/wmv/i)
                                ? <video controls src={img.data} className="d-block w-100" alt={img.data}/>

                                : <img src={img.data} className="d-block w-100" alt={img.data}/>
                            }
                           
                        </div>
                    ))
                }
                
            </div>
            
            {
                images.length > 1 &&
                <>
                    <a className="carousel-control-prev" href={`#image${id}`} role="button" data-slide="prev"
                    style={{width: '5%'}}>
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>

                    <a className="carousel-control-next" href={`#image${id}`} role="button" data-slide="next"
                    style={{width: '5%'}}>
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </>
            }
            
        </div>
    )
}

export default Carousel
