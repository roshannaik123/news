export const validateNewsQuery = (req, res, next) => {
    const {
        category,
        date,
        page = "1",
        limit = "10"
    } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    // Validate date
    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({
            success: false,
            message: "Date must be in YYYY-MM-DD format",
        });
    }

    // Validate page
    if (!Number.isInteger(pageNumber) || pageNumber < 1) {
        return res.status(400).json({
            success: false,
            message: "Page must be a positive integer",
        });
    }

    // Validate limit
    if (
        !Number.isInteger(limitNumber) ||
        limitNumber < 1 ||
        limitNumber > 50
    ) {
        return res.status(400).json({
            success: false,
            message: "Limit must be between 1 and 50",
        });
    }

    next();
};