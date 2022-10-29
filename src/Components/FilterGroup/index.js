import {BsSearch} from 'react-icons/bs'
import './index.css'


const FilterGroup = (props) => {
   
    const renderRatingsFiltersList = () => {
        const {ratingsList} = props

        return ratingsList.map(rating => {
            const {changeRating, activeRatingId} = props
            const onClickRatingItem = () => changeRating(rating.ratingId)
      
            const ratingClassName =
              activeRatingId === rating.ratingId ? `and-up active-rating` : `and-up`
      
            return (
              <li
                className="rating-item"
                key={rating.ratingId}
                onClick={onClickRatingItem}
              >
                <img
                  src={rating.imageUrl}
                  alt={`rating ${rating.ratingId}`}
                  className="rating-img"
                />
                <p className={ratingClassName}>& up</p>
              </li>
            )
          })
    }


    const renderRatingsFilters = () => {
       
        return (
            <div>
                <h1 className="rating-heading">Rating</h1>
                <ul className="ratings-list">{renderRatingsFiltersList()}</ul>
            </div>
        )

       
    }

    const renderCategoriesList = () => {
        const {categoryOptions} = props
        const {changeCategory, activeCategoryId} = props
        return (
            <>
            {categoryOptions.map(category => {
              
                const onClickCategoryItem = () => changeCategory(category.categoryId)
                const isActive = category.categoryId === activeCategoryId
                const categoryClassName = isActive
                        ? `category-name active-category-name`
                        : `category-name`
                
                        return (
                    <li
                        className="category-item"
                        key={category.categoryId}
                        onClick={onClickCategoryItem}
                        >
                        <p className={categoryClassName}>{category.name}</p>                      
                    </li>
                )
            })}         
            </>
        )
        
    }

    const renderProductCategories = () => {
       return <>
            <h1 className="category-heading">Category</h1>
            <ul className="categories-list">{renderCategoriesList()}</ul>
         </>
    }

    const onChangeSearchInput = (e) => {
        const {changeSearchInput} = props
        changeSearchInput(e.target.value)
        
    }

    const onEnterSearchInput = (e) => {
        const {enterSearchInput} = props
            if (e.key === 'Enter') {
                enterSearchInput()
            }
    }

    const renderSearchInput = () => {
        const {searchInput} = props

        return (
            <div className="search-input-container">
              <input
                value={searchInput}
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={onChangeSearchInput}
                onKeyDown={onEnterSearchInput}
              />
              <BsSearch className="search-icon" />
            </div>
          )
    
    }

    

    const onClearFilters = (e) => {
      const {clearFilterValues} = props
      
      clearFilterValues()
        
    }

    
  
   

    return (
        <div className="filters-group-container">
          {renderSearchInput()}
          {renderProductCategories()}
          {renderRatingsFilters()}
          <button
            type="button"
            className="clear-filters-btn"
            onClick={onClearFilters}
          >
            Clear Filters
          </button>
        </div>
      )
}
export default FilterGroup