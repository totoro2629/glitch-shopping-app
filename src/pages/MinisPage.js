import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import interact from 'interactjs';
import { toJpeg } from 'html-to-image';

const Container = styled.div`
  text-align: center;
  width: 80%;
  margin: auto;
`;

const ItemUpload = styled.div`
  margin-bottom: 20px;
`;

const OutfitArea = styled.div`
  width: 100%;
  height: 400px;
  border: 2px dashed #ccc;
  margin: 20px auto;
  position: relative;
  background-color: white;
  overflow: hidden;
`;

const ItemsGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const Item = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Loading = styled.div`
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  font-size: 14px;
  color: #999;
`;

const MinisPage = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const itemInputRef = useRef();
  const apiKeyRef = useRef();

  const uploadItems = async () => {
    const apiKey = apiKeyRef.current.value;
    if (!apiKey) {
      alert('Please enter your remove.bg API key.');
      return;
    }

    setIsLoading(true);

    const files = itemInputRef.current.files;
    for (const file of files) {
      const formData = new FormData();
      formData.append('image_file', file);

      try {
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
          method: 'POST',
          headers: {
            'X-Api-Key': apiKey,
          },
          body: formData,
        });

        if (response.ok) {
          const result = await response.blob();
          const reader = new FileReader();
          reader.onload = function (e) {
            setItems((prevItems) => [
              ...prevItems,
              { src: e.target.result, id: Date.now() },
            ]);
          };
          reader.readAsDataURL(result);
        } else {
          console.error('Error removing background:', response.statusText);
          alert(`Error removing background: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while uploading the image.');
      }
    }

    setIsLoading(false);
  };

  const addItemToOutfit = (src) => {
    const outfitArea = document.getElementById('outfitArea');
    const imgContainer = document.createElement('div');
    imgContainer.className = 'draggable';
    imgContainer.style.position = 'absolute';
    imgContainer.style.left = '50px';
    imgContainer.style.top = '50px';

    const img = document.createElement('img');
    img.src = src;
    img.style.width = '200px';
    img.style.height = 'auto';
    imgContainer.appendChild(img);

    const bringForwardBtn = document.createElement('button');
    bringForwardBtn.innerText = 'Bring Forward';
    bringForwardBtn.className = 'bring-forward hidden';
    bringForwardBtn.onclick = () => {
      imgContainer.style.zIndex = (parseInt(imgContainer.style.zIndex) || 0) + 1;
    };
    imgContainer.appendChild(bringForwardBtn);

    const sendBackwardBtn = document.createElement('button');
    sendBackwardBtn.innerText = 'Send Backward';
    sendBackwardBtn.className = 'send-backward hidden';
    sendBackwardBtn.onclick = () => {
      imgContainer.style.zIndex = (parseInt(imgContainer.style.zIndex) || 0) - 1;
    };
    imgContainer.appendChild(sendBackwardBtn);

    imgContainer.onmouseover = function () {
      bringForwardBtn.classList.remove('hidden');
      sendBackwardBtn.classList.remove('hidden');
    };
    imgContainer.onmouseout = function () {
      bringForwardBtn.classList.add('hidden');
      sendBackwardBtn.classList.add('hidden');
    };

    outfitArea.appendChild(imgContainer);
    applyInteract(imgContainer);
  };

  const applyInteract = (element) => {
    interact(element).draggable({
      onmove: dragMoveListener,
    });
  };

  const dragMoveListener = (event) => {
    const target = event.target;
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  };

  const saveOutfit = () => {
    const outfitArea = document.getElementById('outfitArea');
    const textElement = document.getElementById('dragText');
    const buttons = outfitArea.querySelectorAll('button');
    buttons.forEach((button) => button.style.display = 'none');
    textElement.style.display = 'none';

    toJpeg(outfitArea, { quality: 0.95 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'outfit.jpeg';
        link.click();
        buttons.forEach((button) => button.style.display = '');
        textElement.style.display = '';
      })
      .catch((error) => {
        console.error('Failed to save outfit as JPEG:', error);
        buttons.forEach((button) => button.style.display = '');
        textElement.style.display = '';
      });
  };

  const loadOutfit = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const outfitArea = document.getElementById('outfitArea');
        outfitArea.innerHTML = e.target.result;
        Array.from(outfitArea.children).forEach((child) => applyInteract(child));
      };
      reader.readAsText(file);
    }
  };

  return (
    <Container>
      <h1>Outfit Creator</h1>
      <ItemUpload>
        <input type="file" id="itemInput" multiple ref={itemInputRef} />
        <button onClick={uploadItems}>Upload Items</button>
        <Loading id="loading" isActive={isLoading}>
          Uploading...
        </Loading>
      </ItemUpload>
      <div>
        <input type="text" id="apiKey" ref={apiKeyRef} placeholder="Enter remove.bg API key" />
      </div>
      <OutfitArea id="outfitArea">
        <h2 id="dragText">Drag and Drop Items Here</h2>
      </OutfitArea>
      <ItemsGallery id="itemsGallery">
        <h2>Your Items</h2>
        {items.map((item) => (
          <Item
            key={item.id}
            src={item.src}
            onClick={() => addItemToOutfit(item.src)}
          />
        ))}
      </ItemsGallery>
      <button onClick={saveOutfit}>Save Outfit</button>
      <HiddenInput type="file" id="loadOutfitInput" onChange={loadOutfit} />
      <button onClick={() => document.getElementById('loadOutfitInput').click()}>
        Load Outfit
      </button>
    </Container>
  );
};

export default MinisPage;
