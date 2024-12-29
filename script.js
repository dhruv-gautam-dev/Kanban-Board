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
    case 'createColumn':
        createColumn(currentBoardId, nameValue);
        break
    case 'editColumn':
        editColumn(id, nameValue);
        break
    case 'createTicket':
        createTicket(id, nameValue);
        break    
    case 'editTicket':
        updateTicket(id, nameValue);
        break            
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
//column
function createColumn(boardId,nameValue){
  const board = Boards.find(b=>b.id ===boardId);
  if(!board) return;

  board.columns.push({
    id: generateId('col'),
    name:nameValue,
    tickets:[]
  })
  renderBoardDetails(board);
}

function generateId(prefix) {
  return prefix+`-${Math.floor(Math.random() * 10000000)}`
}

function deleteColumn(colId){
  const board = Boards.find(b=>b.id===currentBoardId);
  if(!board) return;

  board.columns = board.columns.filter(c=>c.id != colId);
  renderBoardDetails(board);
}


function editColumn(colId, nameValue){
  const board = Boards.find(b=>b.id ===currentBoardId);
  if(!board) return;
  const col = board.columns.find(c=>c.id ===colId);
  if(!col) return;
  col.name = nameValue;
  renderBoardDetails(board)
}
//Ticket

function createTicket(colId, nameValue){
  const board = Boards.find(b=>b.id ===currentBoardId);
  if(!board) return;
  const col = board.columns.find(c=>c.id=== colId);
  if(!col) return;

  columns.push({
    id: generateId('ticket'),
    name:nameValue,
    
  })
  renderBoardDetails(board);
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

  // console.log(titleArea);
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

  const columnContainer = document.createElement("div");
  columnContainer.classList.add("columnContainer");

  board.columns.forEach(col =>{

    const columnEl =document.createElement('div');
    columnEl.classList.add('column');

    const columnHeader =document.createElement('div');
    columnHeader.classList.add('columnHeader');

    const columnTitle =document.createElement('div');
    columnTitle.classList.add('columnTitle');

    const h2 = document.createElement('h2');
    h2.textContent= col.name;

    columnTitle.appendChild(h2);

    const columnBtnDiv =document.createElement('div');
    columnBtnDiv.classList.add('columnBtnDiv');

    const editColumnBtn =document.createElement('div');
    editColumnBtn.classList.add('editColumnBtn');
    editColumnBtn.textContent='✏️';
    editColumnBtn.addEventListener('click',()=>{
      openModel({
        title:'Edit column',
        ContextType:'editColumn',
        ContextId:col.id,
        defaultValue:col.name
      })
  
    })


    const deleteColumnBtn =document.createElement('div');
    deleteColumnBtn.classList.add('deleteColumnBtn');
    deleteColumnBtn.textContent = '🗑️';
    deleteColumnBtn.addEventListener('click',()=>{
      deleteColumn(col.id);
    })

    columnBtnDiv.appendChild(editColumnBtn);
    columnBtnDiv.appendChild(deleteColumnBtn);

    columnHeader.appendChild(columnTitle);
    columnHeader.appendChild(columnBtnDiv)
    columnEl.appendChild(columnHeader);



    const addTicketBtn = document.createElement('button');
    addTicketBtn.classList.add("addTicketBtn");
    addTicketBtn.textContent= `Add Ticket`
    addTicketBtn.addEventListener('click',()=>{
      openModel({
        title:'Create Ticket',
        ContextType:  'createTicket',
        ContextId:''
      })
    })
    columnEl.appendChild(addTicketBtn);

    const TicketContainer = document.createElement("div");
    TicketContainer.classList.add("TicketContainer");

    columnEl.appendChild(TicketContainer);

    col.tickets.forEach(ticket=>{
      const ticketEl =document.createElement('div');
      ticketEl.classList.add('ticketEl');

      const ticketNameSpan = document.createElement('h3');
      ticketNameSpan.classList.add('ticketNameSpan');
      ticketNameSpan.textContent=ticket.name;

      const ticketBtnDiv =document.createElement('div');
      ticketBtnDiv.classList.add('ticketBtnDiv');
    
      const editTicketBtn =document.createElement('div');
      editTicketBtn.classList.add('editTicketBtn');
      editTicketBtn.textContent='✏️';
      editTicketBtn.addEventListener('click',()=>{
        openModel({
          title:'Edit ticket',
          ContextType:'editTicket',
          ContextId:ticket.id,
          defaultValue:ticket.name
        })
    
      })

    const deleteTicketBtn =document.createElement('div');
    deleteTicketBtn.classList.add('deleteTicketBtn');
    deleteTicketBtn.textContent = '🗑️';
    deleteTicketBtn.addEventListener('click',()=>{
      deleteTicket(col.id);
    })

    ticketBtnDiv.appendChild(editTicketBtn);
    ticketBtnDiv.appendChild(deleteTicketBtn);
    ticketNameSpan.appendChild(ticketBtnDiv);

    ticketEl.appendChild(ticketNameSpan);
    ticketEl.appendChild(ticketBtnDiv);

    TicketContainer.appendChild(ticketEl);
    })
    columnEl.appendChild(TicketContainer)
    columnContainer.appendChild(columnEl);
  })


  boardDetailsEl.appendChild(columnContainer);

  
  // columnContainer.appendChild(columnContainerTitle);
}