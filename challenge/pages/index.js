import axios from 'axios'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Select, Pagination } from 'antd'
import ProductList from '../components/ProductList'
const { Option } = Select

export default function Home() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [error, setError] = useState(null)
  const [sort , setSort] = useState('price_desc')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    axios.get(`http://localhost:3000/api/search?q=${query}&sort=${sort}&offset=${page}&condition=${filter}`).then(response => {
        setResults(response?.data?.results)
        setTotal(response?.data?.paging?.total)
      }
      ).catch(error => {
        setError(error)
      })
  }, [query, page, sort, filter, total])

  const handleChangePrice = (value) => {
    setSort(value)
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      axios.get(`http://localhost:3000/api/search?q=${query}&sort=${sort}&offset=${page}&condition=${filter}`).then(response => {
        setResults(response?.data?.results)
        setTotal(response?.data?.paging?.total)
      }
      ).catch(error => {
        setError(error)
      })
    }
  }
  const handleChangePage = (page) => {
    setPage(page)
  }
  const handleChangeCondition = (value) => {
    setFilter(value)
  }


  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>Challenge scala learning</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container mx-auto px-4 py-2 flex flex-col">
          <div className="text-center">
              <h1 className="text-4xl font-bold">Search for products</h1>
              <p className="text-gray-600">
                Search for products and see the results
              </p>
              <div className="flex justify-center mt-4">
                <input
                  className="w-full px-4 py-2 text-gray-700 border rounded-lg"
                  type="text"
                  placeholder="Search for products"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
          {results ? (
            <>
              <div className="flex justify-center mt-4">
                <Select defaultValue="" onChange={handleChangePrice}>
                  <Option value="">Order by Price</Option>
                  <Option value="price_desc">highest to lower</Option>
                  <Option value="price_asc">lower to highest</Option>
                </Select>
                <Select defaultValue="" onChange={handleChangeCondition}>
                  <Option value="">Condition</Option>
                  <Option value="all">All</Option>
                  <Option value="new">New</Option>
                  <Option value="used">Used</Option>
                </Select>
              </div>
              <ProductList products={results} />
              <div className="flex justify-center mt-4">
                <Pagination defaultCurrent={page} total={total} onChange={handleChangePage} showSizeChanger={false} />
              </div>
            </>
          ) : (
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  No results Found
                </p>
              </div>
            )}
        </div>
      </main>

      <footer>
        <div className="container mx-auto px-4 py-2 flex flex-col items-center text-center self-center justify-between">
          made with ❤️ by Mauricio Del Río
        </div>
      </footer>

    </div>
  )
}
