import { gql, useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'

const ALL_Authors = gql`
    query {
      allAuthors {
        name
        born 
        bookCount
      }
    }
`
const UPDATE_BIRTH = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!){
    editAuthor(name: $name, setBornTo: $setBornTo){
    name
    born
    }
  }

`
const Authors = (props) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [ updateBirth ] = useMutation(UPDATE_BIRTH,{
    refetchQueries:[{ query: ALL_Authors}]
  })
  const result = useQuery(ALL_Authors)
   

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <p>Loading authors...</p>
  }

  if (result.error) {
    return <p>Error fetching authors</p>
  }
  const submit = (event)=>{
    event.preventDefault()
    updateBirth({variables:{name, setBornTo:Number(year)}})

    setName('')
    setYear('')
  }
  
  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {result.data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Set birthyear</h2>
            <form onSubmit={submit}>
              {/* <div>
                name
                <input
                  value={name}
                  onChange={({ target }) =>setName(target.value)}
                  />
              </div> */}

              <div>
                <select value={name} onChange={({ target }) =>setName(target.value)}>
                  <option value="">
                  Select an author
                  </option>
                  {result.data.allAuthors.map((author) =>(
                    <option value={author.name} key={author.name} >
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                year
                <input
                  value={year}
                  onChange={({ target }) =>setYear(target.value)}
                  />
              </div>
              <button type="submit">update author</button>
            </form>
      </div>
    </div>
  )
}

export default Authors
