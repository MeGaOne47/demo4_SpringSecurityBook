package com.example.demo.dto;

public class BookDto {
    private Long id;
    private String title;
    private String author;
    private String price;
    private String categoryName;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getAuthor() {
        return author;
    }



    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setPrice(Double price) {
        this.price = String.valueOf(price);
    }

    public String getPrice() {
        return price;
    }
}
