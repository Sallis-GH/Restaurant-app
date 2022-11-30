import MenuCard from './MenuCard'

const MenuCardContainer = ({ menus, category, getProductData, isAddMenu }) => {

  return (
    <section className='container'>
      <div className={`row d-flex justify-content-center  ${isAddMenu ? 'justify-content-md-between ' : 'justify-content-md-between'}`}>
        <h1 className={`border-bottom text-left  category-header  ${isAddMenu ? 'mt-1 lead' : 'mt-5 fw-bold lead fs-2'}`}>{category}</h1>
        <div className={`${isAddMenu ? '' : 'mt-4'}`}></div>
        {menus?.map((item, index) => (
          <MenuCard key={index}
          id={item.sys.id}
            name={item.fields.name}
            description={item.fields.description}
            image={item.fields.image?.fields.file.url}
            price={item.fields.price}
            currency={item.fields.currency}
            getProductData={getProductData}
            isAddMenu={isAddMenu}
          />))}
      </div>
    </section>
  )
}

export default MenuCardContainer