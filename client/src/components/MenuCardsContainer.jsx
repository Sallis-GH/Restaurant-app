import MenuCard from './MenuCard'

const MenuCardContainer = ({ menus, category, getProductData}) => {


  return (
    <section className='container'>
      <div className='row d-flex justify-content-between'>
        <h1 className='border-bottom text-left lead fs-1 category-header'>{category}</h1>
        <div className='mt-4'></div>
        {menus?.map((item, index) => (
          <MenuCard key={index}
            name={item.fields.name}
            description={item.fields.description}
            image={item.fields.image?.fields.file.url}
            price={item.fields.price}
            currency={item.fields.currency}
            getProductData={getProductData}
          />))}
      </div>
    </section>
  )
}

export default MenuCardContainer