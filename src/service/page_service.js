const dao = require("../database/pageDAO");

const pageOperation = (start, totalCounter) =>{
    let page = {};
    const pageNum = 3;  // 페이지당 보여줄 글 개수
    const num = (totalCounter % pageNum === 0)? 0:1;
    page.totPage = parseInt( totalCounter / pageNum) + num;
    page.startNum = (start -1) * pageNum + 1;
    page.endNum = start * pageNum;
    return page;
}

const pageRead = {
    list : async (start, totalC) => {
        start = (start && start >= 1)? Number(start):1;
        const page = pageOperation(start, totalC);
        /*
        if (start && start >= 1){
            start = Number(start);
        }else {
            start = 1;
        }
        */
        const list = await dao.daoRead.list(page.startNum, page.endNum);
        console.log("service : ", list);

        data = {};
        data.page = page;
        data.start = start;
        data.list = list.rows;
        console.log("data : ", data);
        return data;
    },
    content : async (num) =>{
        await pageUpdate.upHit(num);
        const data = await dao.daoRead.content(num);
        return data.rows[0];
    },
    totalContent : async () =>{
        const totalContent = await dao.daoRead.totalContent();
        console.log( totalContent );
        return totalContent.rows[0]['COUNT(*)'];
        }
}

const pageUpdate = {
    upHit : async (num) => {
        await dao.daoUpdate.upHit(num);
    }
}

const pageInsert = {
    write : async ( body ) =>{
    const result = await dao.daoInsert.write( body );
    }
}

module.exports = { pageRead, pageInsert };