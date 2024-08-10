import { saveAs } from 'file-saver'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import setting from '../asset/setting.svg'

const Home = () => {
  const inputRef = useRef(null)
  const [image, setImage] = useState(null)
  const [toggle, setToggle] = useState({ upload: "block", edit: "hidden" })
  const [checked, setChecked] = useState()
  const [url, setUrl] = useState("")
  const [dimension, setDimension] = useState({ hegiht: 0, width: 0 })
  const [aspect, setAspect] = useState("16:9")
  const [aspectAns, setAspectAns] = useState(0)

  const width = document.getElementById("Width")
  const height = document.getElementById("Height")


  const aspactValue = ["16:9", "21:9", "16:10", "9:16", "5:4", "4:3", "3:2", "1:1"]


  const resizeImage = () => {
    const imgDimanstion = document.getElementById("imgPath")
    let canvas = document.createElement('canvas')
    canvas.width =dimension.width
    canvas.height=dimension.hegiht
    let ctx = canvas.getContext('2d')
    ctx.drawImage(imgDimanstion,0,0,dimension.width,dimension.hegiht)
    let urlValue = canvas.toDataURL("image/jpg",1.0)
    saveAs(urlValue, "Download");
    console.log(dimension.width,dimension.hegiht)
  }
  const handlecheckBox = () => {
    setChecked(checked => !checked)
  }
  const handleImageClick = () => {
    inputRef.current.click()
  }
  const handleDragOver = (e) => {
    e.preventDefault()
  }
  const handleDrop = (event) => {
    event.preventDefault()
    console.log(event.dataTransfer.files)
    setImage(event.dataTransfer.files[0])
  }
  const handleUpload = (e) => {
    setImage(e.target.files[0])
  }
  const handleAspect1 = (e)=>{
    setDimension({ width: e.target.value, hegiht: parseFloat((width.value / aspectAns).toFixed(0)) }) 
  }
  const handleAspect2 = (e)=>{
    setDimension({ width: parseFloat((height.value * aspectAns).toFixed(0)), hegiht: e.target.value })
  }
  useEffect(() => {
    if (image != null) {
      setToggle({ upload: "hidden", edit: "none" })
      setUrl(URL.createObjectURL(image))
      setTimeout(() => {
        setChecked(true)
      }, 1000)
    }
  }, [image])
  useEffect(() => {
    if (toggle.edit === "none") {
      const imgDimanstion = document.getElementById("imgPath")
      setDimension({
        hegiht: imgDimanstion.naturalHeight,
        width: imgDimanstion.naturalWidth
      })
    }
    if (checked === true) {
      let value = aspect.split(":")
      let aspectCalculation = +value[0] / +value[1]
      setAspectAns(aspectCalculation)
    }
  }, [toggle, checked, aspect])

  const settingMenu = () =>{
    console.log("h")
  }

  return (
    <>
      <div id='uploadPart' className={toggle.upload}>
        <div className="bg-orange-50 flex flex-col justify-center items-center w-full h-102">
          <h1 className="absolute top-24 xl:top-20 text-2xl xl:text-5xl sm:text-4xl text-green-900 font-bold">Resize IMAGE</h1>
          <h3 className="absolute top-36 xl:text-3xl text-xl px-3 text-green-900"> Resize JPG, PNG, SVG or GIF by defining new height and width pixels.</h3>
          <h3 className="absolute xl:top-44 top-56 text-xl text-green-900"> Change image dimensions in bulk.</h3>
          <div className="sm:w-2/4 w-5/6 cursor-pointer h-40 xl:h-44 flex justify-center items-center border-dashed border-4 border-cyan-700 rounded-lg" onClick={handleImageClick} onDragOver={handleDragOver} onDrop={handleDrop}>
            <label className="m-10 xl:px-20 px-8 py-5 text-xl rounded-lg bg-green-900 text-green-50 cursor-pointer">Select Images</label>
            <input type="file" accept='image/jpg, image/jpeg, image/png' ref={inputRef} className="hidden" id='inp' onChange={handleUpload} />
          </div>
        </div>
      </div>

      <div id='EditPart' className={`${toggle.edit} overflow-hidden`}>
        <div className="bg-orange-50 flex flex-wrap justify-center items-center w-full h-102">
          <div className="w-11/12 xl:w-3/5 h-full flex justify-center items-center">
            <div className="bg-white w-3/4 h-4/5 bg-covers flex justify-center items-center rounded-xl">
              {image ? <img src={url} className='h-full object-cover' id='imgPath' alt='img' /> : <img src='' alt='No img' />}
            </div>
          </div>
          <div className='xl:hidden absolute right-10 top-28 z-10'>
              <img src={setting} alt="" className="cursor-pointer" onClick={settingMenu} />
            </div>
          <div className="bg-white w-2/5 h-full flex flex-col">
            <div className="border-b-2 border-green-800">
              <h1 className="text-5xl font-bold text-center py-4">Resize options</h1>
            </div>
            <div className="border-b-2 border-green-800">
              <h1 className="text-2xl py-4 px-4">Resize all images to a exact size of</h1>
            </div>
            <div className="border-b-2 border-green-800 flex justify-between px-4">
              <div className="py-6 text-2xl"><h2>Width (px):</h2></div>
              <div className="py-6 text-2xl"><input type="number" name="" value={dimension.width} onChange={checked ? handleAspect1 : (e)=>{setDimension({width : e.target.value,hegiht:dimension.hegiht})}} id="Width" className=" rounded-l text-center w-32 h-10 border-2 border-zinc-950" /></div>
            </div>
            <div className="border-b-2 border-green-800 flex justify-between px-4">
              <div className="py-6 text-2xl"><h2>Height (px):</h2></div>
              <div className="py-6 text-2xl"><input type="number" name="" value={dimension.hegiht} onChange={checked ? handleAspect2 : (e)=>{setDimension({width:dimension.width,hegiht:e.target.value})}} id="Height" className=" rounded-l text-center w-32 h-10 border-2 border-zinc-950" /></div>
            </div>
            <div className="border-b-2 border-green-800 flex justify-between px-4 items-center">
              <div className="py-6 text-2xl"><h2 className="text-2xl">Different Aspect Ratios :</h2></div>
              <div className="py-6 text-2xl">
                <select className='rounded-l text-center w-24 h-20 border-2 border-zinc-950' value={aspect} onChange={(e) => { setAspect(e.target.value) }}>
                  {
                    aspactValue.map((item) => {
                      return (<option value={item}>{item}</option>)
                    })
                  }
                </select>
              </div>
            </div>
            <div className="border-b-2 border-green-800 flex px-4">
              <div className="py-4 text-2xl"><input type="checkbox" value={checked} name="" id="" defaultChecked={true} onChange={handlecheckBox} className="rounded-l text-center w-32 h-10 border-2 border-zinc-950 cursor-pointer" /></div>
              <div className="py-4 text-2xl"><h2>Maintain aspect ratio</h2></div>
            </div>
            <div className="flex justify-center px-4">
              <div className="py-6 text-2xl"><button onClick={resizeImage} className="bg-green-950 cursor-pointer text-green-50 text-3xl px-12 py-4 rounded-xl">Resize Image</button></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
//Resize all images to a exact size of
export default Home