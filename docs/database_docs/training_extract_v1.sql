SELECT 
    TRIM(t.details || ' ' || t.particulars || ' ' || t.reference || ' ' || t.code) AS concatenated_features,
    c.category_name
FROM 
    transactions AS t
JOIN 
    categories AS c ON t.budget_cat_id = c.category_id
WHERE 
    t.details IS NOT NULL AND 
    t.particulars IS NOT NULL AND 
    t.reference IS NOT NULL AND 
    t.code IS NOT NULL AND 
    c.category_name IS NOT NULL;