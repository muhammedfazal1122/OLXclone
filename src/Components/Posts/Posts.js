import React,{useEffect , useContext, useState} from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import { useHistory } from 'react-router-dom'




function Posts() {
  const {firebase} = useContext(FirebaseContext)
  const [products , setProducts] = useState([])
  const {setPostDetails , postDetails} = useContext(PostContext)
  const  history = useHistory()

  useEffect(()=>{
 firebase.firestore().collection('products').get().then((snapshot)=>{
  const allPost = snapshot.docs.map((product)=>{
    return {
      ...product.data(),
      id:product.id
    }
  })
  setProducts(allPost)
 })
  } , [])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Latest Listings</span>
          <span>.</span>
        </div>
        <div className="cards">
          <div className='container'>
            <div className='row'>
              {products.map(product=>{
                
                return <div  className="card col-lg-4" onClick={()=>{setPostDetails(product)
                history.push('/view')
                
                }}>

      <div className="favorite">
        <Heart></Heart>
      </div>
      <div className="image">
        <img src={product.url} alt="" />
      </div>
      <div className="content"> 
        <p className="rate">&#x20B9; {product.price}</p>
        <p className="name">Name : {product.name}</p>
        <p className="kilometer">Category : {product.category}</p>
      </div>
      <div className="date">
        <span>{product.createdAt}</span>
      </div>
    </div>
    
    })}
    </div>
    </div>

        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
