import { useState } from 'react';
import styles from './Workspace.module.scss';
import dummyImg from '../../images/user-profile-icon.svg';

function Workspace() {
  const [items, setItems] = useState(['Input', 'Image']);
  const [dropped, setDropped] = useState([]);
  const [imageChosen, setImageChosen] = useState([dummyImg]);
  const handleDragStart = (event, item) => {
    event.dataTransfer.setData('text/plain', item);
  };

  const handleDrop = (event, container) => {
    event.preventDefault();
    const item = event.dataTransfer.getData('text/plain');
    if (container === 'source') {
      setItems(items.filter((i) => i !== item));
    } else {
      setDropped([...dropped, item]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageChosen([...imageChosen, URL.createObjectURL(event.target.files[0])]);
    }
   }

  return (
    <>
      <div
        onDrop={(event) => handleDrop(event, 'source')}
        onDragOver={handleDragOver}
        className={styles.sidebar}
      >
        <h2>Sidebar</h2>
        {items.map((item, i) => (
          <p
            key={item+i}
            draggable
            onDragStart={(event) => handleDragStart(event, item)}
          >
            {item}
          </p>
        ))}
      </div>
      <div
        onDrop={(event) => handleDrop(event, 'destination')}
        onDragOver={handleDragOver}
        className={styles.workspace}
      >
        <h2>Workarea</h2>
        {dropped.map((item, i) => {
          if(item === 'Input'){
            return(
              <div key={"input"+i} className={styles.container}>
                <textarea></textarea>
              </div>
            )
          }
          if(item === 'Image'){
            return(
              <div key={"image"+i}  className={styles.container}>
                <div className={styles.image_container}>
                  <input type="file" name="images" id={"img"+i} onChange={onImageChange} />
                  <label htmlFor={"img"+i}>
                    <img src={`${imageChosen[i] ? imageChosen[i] : imageChosen[0]}`} alt="image" />
                  </label>
                </div>
              </div>
            )
          }
        })}
      </div>
    </>
  );
}

export default Workspace;
