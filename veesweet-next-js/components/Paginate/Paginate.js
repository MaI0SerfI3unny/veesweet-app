const Paginate = ({ postsPerPage, totalPosts, setPage, page }) => {
   const pageNumbers = [];
   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
   }
   return (
      <div className="paginate-container">
        {pageNumbers.map((el) => 
            <div key={el} style={
                page === el ? 
                { color: "white", background: "#E77373" } : 
                { color: "black", background: "white" }
            } className="paginate-item" onClick={() => setPage(el)}>{el}</div>
        )}
      </div>
   );
};

export default Paginate