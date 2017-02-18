class AreasController < ApplicationController
  def index
    @area = Area.new
  end

  def new
    @area = Area.new
  end

  def create
    @area = Area.create(area_params)
  end

  def show
    @area = Area.find(params[:id])
  end

  def area_params
    params.require(:area).permit(:name, :importance, :satisfaction)
  end
end
