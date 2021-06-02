import React, { useState, useContext } from 'react'
import ProductService from '../../services/productService'
import { Cell, Grid, Row } from '@material/react-layout-grid';
import TextField, { Input } from '@material/react-text-field';
import Button from '@material/react-button'
import ProductCard from './components/productCard';
import CategoryContext from '../../context/categoryContext'
import CategoryOptions from './components/categoryOptions'
import LoadingView from '../layout/loadingView'

const productService = new ProductService();

function ProductSearchPage() {
    const [isSearching, setIsSearching] = useState(false)
    const [products, setProducts] = useState([])
    const [categoryId, setCategoryId] = useState(-1)
    const [searchText, setSearchText] = useState("")
    const [minValue, setMinValue] = useState("")
    const [maxValue, setMaxValue] = useState("")
    const categories = useContext(CategoryContext)

    const searchProducts = async (text) => {
        if (isSearching) {
            return
        }

        setIsSearching(true)
        const resultProducts = await productService.searchProducts(
            text,
            categoryId,
            minValue,
            maxValue
        )
        setIsSearching(false)
        if (resultProducts) {
            setProducts(resultProducts)
        }
    }

    const textChange = (e) => {
        const { value } = e.target
        setSearchText(value)
    }

    const searchHandler = () => {
        searchProducts(searchText)
    }

    return (
        <Grid>
            <Row>
                <Cell desktopColumns={12} phoneColumns={4} tabletColumns={8}>
                    <TextField
                        outlined
                        label='搜尋商品'
                        style={{ width: "300px" }}
                    >
                        <Input
                            type="text"
                            value={searchText}
                            onChange={textChange}
                        />
                    </TextField>
                    <div style={{
                        display: "inline-block",
                        height: "58px",
                        marginLeft: "16px"
                    }}>
                        <CategoryOptions
                            value={categoryId}
                            categories={categories}
                            onChange={(e) => {
                                const { value } = e.target
                                setCategoryId(value)
                            }}
                        />
                    </div>
                    <TextField
                        outlined
                        label='最小金額'
                        style={{ width: "88px", marginLeft: "16px" }}
                    >
                        <Input
                            type="number"
                            min={0}
                            value={minValue}
                            onChange={(e) => {
                                const { value } = e.target
                                setMinValue(value)
                            }}
                        />
                    </TextField>
                    <TextField
                        outlined
                        label='最大金額'
                        min={0}
                        style={{ width: "88px", marginLeft: "16px" }}
                    >
                        <Input
                            type="number"
                            value={maxValue}
                            onChange={(e) => {
                                const { value } = e.target
                                setMaxValue(value)
                            }}
                        />
                    </TextField>
                    <Button
                        outlined
                        onClick={searchHandler}
                        disabled={isSearching}
                        style={{
                            height: "58px",
                            marginLeft: "16px"
                        }}>
                        Search
                    </Button>
                </Cell>
            </Row>
            <br />
            <Row>
                {
                    isSearching ? (
                        <Cell desktopColumns={12} phoneColumns={4} tabletColumns={8}>
                            <LoadingView />
                        </Cell>
                    ) :
                        products.length === 0 ?
                            (
                                <Cell desktopColumns={12} phoneColumns={4} tabletColumns={8}>
                                    <h1 style={{ textAlign: "center" }}>沒有商品</h1>
                                </Cell>
                            ) :
                            (
                                products.map((product) => {
                                    return (
                                        <Cell key={product.name} desktopColumns={3} phoneColumns={4} tabletColumns={4}>
                                            <ProductCard product={product} />
                                        </Cell>
                                    )
                                })
                            )
                }
            </Row>
        </Grid>
    )
}

export default ProductSearchPage;
