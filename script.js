let Boards =[];
let currentBoardId = null;


const boardListEl = document.getElementById('boardListEl'); 
boardDetailsEl =document.getElementById('boardDetailsEl');

const createBoardBtn = document.getElementById("createBoardBtn");
const modalTitle = document.getElementById("modalTitle");
const modalInput = document.getElementById('modalInput');
const modalContextType = document.getElementById('modalContextType');
const modalContextId = document.getElementById('modalContextId')
const modalSaveBtn =document.getElementById('modalSaveBtn');
const modalCancelBtn =document.getElementById('modalCancelBtn');
const modalOverlay = document.getElementById('modalOverlay');

createBoardBtn.addEventListener("click",()=>{
  openModel({
    title:'Create Board',
    ContextType:"createBoard"
  });
})

modalSaveBtn.addEventListener('click',handleModalSave);
modalCancelBtn.addEventListener('click',closeModal);

function openModel({title , ContextType, defaultValue='', ContextId=''}){
  modalTitle.textContent =title;
  modalInput.value=defaultValue;
  modalContextType.value = ContextType;
  modalContextId.value = ContextId;

  modalOverlay.style.display = 'flex';
  modalInput.focus();
}


function closeModal(){
  modalOverlay.style.display='none';
  modalInput.Value = '';
  modalContextType.value = '';
  modalContextId.value = '';

}

function handleModalSave(){
  const nameValue = modalInput.value.trim();
  console.log(nameValue);
  const type = modalContextType.value;
  const id = modalContextId.value;


  if(!nameValue) {
    alert('Please enter a name');
    return;
}

  switch (type) {
    case 'createBoard':
        createBoard(nameValue);
        break
    // case 'createColumn':
    //     createColumn(currentBoardId, nameValue);
    //     break
    // case 'editColumn':
    //     editColumn(id, nameValue);
    //     break
    // case 'createTicket':
    //     createTicket(id, nameValue);
    //     break    
    // case 'editTicket':
    //     updateTicket(id, nameValue);
    //     break            
}

  closeModal();
  // renderBoardList(nameValue);
}

function createBoard(boardName){
  const newBoard ={
    id:generateId('board'),
    name:boardName,
    columns:[]
  };

  Boards.push(newBoard);
  renderBoardList();
  selectBoard(newBoard.id);
}
function selectBoard(boardId){
  currentBoardId = boardId;
  renderBoardList();
  const board = Boards.find(b => b.id === boardId);
  renderBoardDetails(board);
}

function generateId(prefix) {
  return prefix+`-${Math.floor(Math.random() * 10000000)}`
}

function renderBoardList(){
  boardListEl.innerHTML =``;

  Boards.forEach(board =>{
    const li = document.createElement('li');
    li.textContent= board.name;
    li.dataset.id = board.id;
    li.addEventListener('click',()=>selectBoard(board.id))
    if(board.id===currentBoardId){
      li.classList.add('active');
    };
    boardListEl.appendChild(li);
    
  })

}

function renderBoardDetails(board){
  boardDetailsEl.innerHTML=``;
  console.log(board);
  if(!board){
    const p = document.createElement('p');
    p.textContent=`No board Selected, Create or Select the Board.`;
    boardListEl.appendChild(p);
    return;
  }


  const titleArea = document.createElement('div');
  titleArea.classList.add('titleArea');

  console.log(titleArea);
  const h2 = document.createElement('h2');
  h2.textContent = board.name;

  titleArea.appendChild(h2);
  boardDetailsEl.appendChild(titleArea)

  const addColBtn = document.createElement('button');
  addColBtn.classList.add("addColBtn");
  addColBtn.textContent= `Add Column`
  addColBtn.addEventListener('click',()=>{
    openModel({
      title:'Create Column',
      ContextType:  'createColumn',
      ContextId:''
    })
  })
  titleArea.appendChild(addColBtn);
}