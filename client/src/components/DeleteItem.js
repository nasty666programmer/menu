import React,{useEffect, useState} from 'react';
import axios from 'axios'

function DeleteItem(props) {
    const [searchItem,setSearchItem] = useState({title:''});
    const [data,setData] = useState();

    useEffect(() => {
        axios.get('http://localhost:3007/data-menu')
        .then(res => setData(res.data))
        .catch(err => console.log)
    },[])


    const deleteChildren = (item,arr=[]) => {
        item.children.filter(el => {
            if(el.title == searchItem.title) {
                console.log(el)
                axios.delete('http://localhost:3007/delete-item', {data:{id:el._id}})
                .then(res => console.log(res))
                .catch(err => console.log)
            }else if (el.children.length) {
                deleteChildren(el,arr)
            }
            return arr;
    })
}

    const deleteItems = () => {
        console.log(data)
         data.filter(el => {
            if(el.title == searchItem.title) {
                console.log(el._id)
                axios.delete('http://localhost:3007/delete-item', {data:{id:el._id}})
                .then(res => console.log(res))
                .catch(err => console.log)
            }else if (el.children.length) {
                deleteChildren(el)
            }
        })
    }

    return (
        <div>
            <input type={'text'} value={searchItem.title} onChange={(e) => setSearchItem({title:e.target.value})}/>
            <button onClick={deleteItems}>delete</button>
        </div>
    )
}

export default DeleteItem;