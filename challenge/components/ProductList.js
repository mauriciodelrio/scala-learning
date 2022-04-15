// create a product list using antd

import {List, Avatar} from 'antd';

const ProductList = ({products}) => {
    return (
        <List
            itemLayout="horizontal"
            className='mt-4'
            dataSource={products}
            renderItem={item => (
            <List.Item>
                <List.Item.Meta
                avatar={<Avatar src={item.thumbnail}/>}
                title={<a href="#">{item.title}</a>}
                />
                <div className='text-gray-600 flex justify-between'>
                    <span className="text-gray-600">{item.price}{' '}{item.currency_id}</span>
                    &nbsp;&nbsp;&nbsp;
                    <span className="text-blue-600">{item.condition}</span>
                    &nbsp;&nbsp;&nbsp;
                    <span className="text-orange-600">quantity: {item.available_quantity}</span>
                </div>
            </List.Item>
            )}
        />
  )
}

export default ProductList