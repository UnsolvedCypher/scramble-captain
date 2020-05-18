class CompetitionSerializer < BaseSerializer
  def initialize(@competition : Competition)
  end

  def render
    {
      name:       @competition.name,
      delegates:  @competition.comp_delegates.map { |d| {id: d.id, name: d.name} }.to_a,
      scramblers: @competition.scramblers.map { |s| {id: s.id, name: s.name} }.to_a,
      scrambles:  @competition.scrambles.map { |s| ScrambleSerializer.new(s).render }.to_a,
    }
  end
end
