import { gettext } from 'i18n'
import { DEFAULT_DECK_LIST } from './../utils/constants'
AppSettingsPage({
  state: {
    todoList: [[]],
    props: {},
  },
  addTodoList(val) {
    this.state.todoList = [...this.state.todoList, [val, "fill in the definition!"]]
    this.setItem()
  },
  editWord(val, index) {
    this.state.todoList[index][0] = val
    this.setItem()
  },
  editDef(val, index) {
    this.state.todoList[index][1] = val
    this.setItem()
  },
  deleteTodoList(index) {
    this.state.todoList = this.state.todoList.filter((_, ind) => {
      return ind !== index
    })
    this.setItem()
  },
  setItem() {
    const newString = JSON.stringify(this.state.todoList)
    console.log(newString)
    this.state.props.settingsStorage.setItem('todoList', newString)
  },
  setState(props) {
    this.state.props = props
    if (props.settingsStorage.getItem('todoList')) {
      this.state.todoList = JSON.parse(
        props.settingsStorage.getItem('todoList'),
      )
    } else {
      this.state.todoList = [...DEFAULT_DECK_LIST]
    }
    console.log('todoList: ', this.state.todoList)
  },
  build(props) {
    this.setState(props)
    const contentItems = []
    const addBTN = View(
      {
        style: {
          fontSize: '12px',
          lineHeight: '30px',
          borderRadius: '30px',
          background: '#656565',
          color: 'white',
          textAlign: 'center',
          padding: '0 15px',
          width: '30%',
        },
      },
      [
        TextInput({
          label: gettext('addDeck'),
          onChange: (val) => {
            this.addTodoList(val)
          },
        }),
      ],
    )
    this.state.todoList.forEach((item, index) => {
      contentItems.push(
        View(
          {
            style: {
              borderBottom: '1px solid #eaeaea',
              padding: '100px 0',
              marginBottom: '6px',
              background: '#d3d3d3',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '3px',
            },
          },
          [
            View(
              {
                style: {
                  fontSize: '16px',
                  borderRadius: '10px',
                  background: '#3f3f3f',
                  marginTop: '10px',
                  color: 'white',
                  width: '50%',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '4px',
                },
              },
              [
                TextInput({
                  label: '',
                  bold: true,
                  value: item[0],
                  subStyle: {
                    color: '#ffffff',
                    fontSize: '14px',
                    padding: '5px',
                  },
                  maxLength: 200,
                  onChange: (val) => {
                    if (val.length > 0 && val.length <= 200) {
                      this.editWord(val, index)
                    } else {
                      console.log("Word can't be empty or too long!")
                    }
                  },
                }),
              ],
            ),
            View(
              {
                style: {
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justfyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '10px',
                  marginTop: '10px',
                },
              },
              [
                TextInput({
                  label: '',
                  bold: true,
                  value: item[1],
                  subStyle: {
                    color: '#333',
                    fontSize: '14px',
                    borderBottom: '1px solid #eaeaea',
                  },
                  maxLength: 200,
                  onChange: (val) => {
                    if (val.length > 0 && val.length <= 200) {
                      this.editDef(val, index)
                    } else {
                      console.log("Definition can't be empty or too long!")
                    }
                  },
                }),
              ],
            ),
            Button({
              label: gettext('Delete'),
              style: {
                fontSize: '10px',
                borderRadius: '20px',
                background: '#D85E33',
                color: 'white',
                width: '25%',
                padding: '1px',
                marginBottom: '10px'
              },
              onClick: () => {
                this.deleteTodoList(index)
              },
            }),
          ],
        ),
      )
    })
    return View(
      {
        style: {
          padding: '12px 20px',
        },
      },
      [
        addBTN,
        contentItems.length > 0 &&
          View(
            {
              style: {
                marginTop: '12px',
                padding: '10px',
                border: '1px solid #eaeaea',
                borderRadius: '6px',
                backgroundColor: 'white',
              },
            },
            [...contentItems],
          ),
      ],
    )
  },
})
